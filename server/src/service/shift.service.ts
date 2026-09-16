import type { Demographic, ESSStatus, Outcome, ShiftLog, TransactionType } from "@qcpesopedro/shared/prisma/client";
import ShiftModel from "../models/shift.model";
import DateUtil from "../utils/date.util";
import TransactionModel from "../models/transaction.model";
import type {
    ShiftLogFindManyArgs,
    ShiftLogOrderByWithRelationInput,
    ShiftLogWhereInput,
} from "@qcpesopedro/shared/prisma/models";
import { calcAvgShiftApproval } from "@qcpesopedro/shared/prisma/sql";
import prisma from "../config/prisma.config";
import type { ShiftDetailsQueryType, ShiftQueryIncludeType } from "@qcpesopedro/shared/schema/shift";

export default {
    async getShiftLogs(args?: ShiftLogFindManyArgs, startDate?: Date, endDate?: Date) {
        const result = ShiftModel.getShiftLogs({
            ...args,
            where: {
                ...(args?.where ?? {}),
                ...this.buildShiftDateRange(startDate, endDate),
            },
        });
        return result;
    },
    async getStatusCount(status: ESSStatus, startDate?: Date, endDate?: Date) {
        const result = ShiftModel.count({
            where: {
                ...this.buildShiftDateRange(startDate, endDate),
                status,
            },
        });
        return result;
    },
    async getAvgApproval(startDate?: Date, endDate?: Date) {
        const result = await prisma.$queryRawTyped(calcAvgShiftApproval(startDate ?? null, endDate ?? null));
        const firstRow = result[0];
        const averageSecondsNum = firstRow?.averageSeconds ? firstRow.averageSeconds.toNumber() : 0;
        return DateUtil.formatInterval(averageSecondsNum);
    },

    async getShiftOverview(
        startDate?: Date,
        endDate?: Date,
        where?: ShiftLogWhereInput,
        orderBy?: ShiftLogOrderByWithRelationInput,
        include?: ShiftQueryIncludeType[]
    ) {
        const resolveInclude = <T>(key: ShiftQueryIncludeType, resolvedValue: T) => {
            return include?.includes(key) ? resolvedValue : Promise.resolve(undefined);
        };

        const [shifts, pending, approved, revision, rejected, average] = await Promise.all([
            resolveInclude(
                "shifts",
                this.getShiftLogs(
                    {
                        include: { user: true, verifier: true, _count: { select: { transactions: true } } },
                        where,
                        orderBy,
                    },
                    startDate,
                    endDate
                )
            ),
            resolveInclude("pending", this.getStatusCount("PENDING", startDate, endDate)),
            resolveInclude("approved", this.getStatusCount("APPROVED", startDate, endDate)),
            resolveInclude("revision", this.getStatusCount("REVISION", startDate, endDate)),
            resolveInclude("rejected", this.getStatusCount("REJECTED", startDate, endDate)),
            resolveInclude("average", this.getAvgApproval(startDate, endDate)),
        ]);
        return { pending, approved, revision, rejected, average, shifts };
    },

    async getShiftDetails(shiftId: number, query: ShiftDetailsQueryType) {
        const { overview } = query;

        const total = overview?.includes("total")
            ? await TransactionModel.count({ where: { shiftLogId: shiftId } })
            : undefined;

        const sources = await getShiftSources(shiftId, query);
        const demographics = await getShiftDemographics(shiftId, query);
        const outcomes = await getShiftOutcomes(shiftId, query);

        return {
            total,
            ...sources,
            ...demographics,
            ...outcomes,
        };
    },

    isTodayShift(shift: ShiftLog) {
        const shiftIn = new Date(shift.timeIn);
        const { startDate } = DateUtil.buildDayRange(new Date()); // today
        return shiftIn >= startDate;
    },

    async getEnvironmentTagCounts(startDate?: Date, endDate?: Date) {
        const shifts = await ShiftModel.getShiftLogs({
            where: { ...this.buildShiftDateRange(startDate, endDate) },
            select: { environmentTags: true },
        });

        const tagCounts: Record<string, number> = {};
        for (const shift of shifts) {
            for (const tag of shift.environmentTags) {
                tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
            }
        }

        return tagCounts;
    },

    async getEnvironmentTagAnalytics(startDate?: Date, endDate?: Date) {
        const currentCounts = await this.getEnvironmentTagCounts(startDate, endDate);

        let previousCounts: Record<string, number> = {};
        if (startDate && endDate) {
            const { startDate: prevStart, endDate: prevEnd } = DateUtil.getPreviousDateRange(
                new Date(startDate),
                new Date(endDate)
            );
            previousCounts = await this.getEnvironmentTagCounts(prevStart, prevEnd);
        }

        const allTags = new Set([...Object.keys(currentCounts), ...Object.keys(previousCounts)]);

        return Array.from(allTags).map((tag) => ({
            environmentTag: tag,
            count: currentCounts[tag] ?? 0,
            previous: previousCounts[tag] ?? 0,
        }));
    },

    buildShiftDateRange(startDate?: Date, endDate?: Date): ShiftLogWhereInput {
        return {
            ...(startDate || endDate
                ? {
                      OR: [
                          {
                              timeIn: {
                                  ...(startDate ? { gte: startDate } : {}),
                                  ...(endDate ? { lte: endDate } : {}),
                              },
                          },
                          {
                              timeOut: {
                                  ...(startDate ? { gte: startDate } : {}),
                                  ...(endDate ? { lte: endDate } : {}),
                              },
                          },
                      ],
                  }
                : {}),
        };
    },
};

async function getShiftSources(shiftId: number, query: ShiftDetailsQueryType) {
    if (!query.analytics) return {};

    // Sources
    const typeGroups = await TransactionModel.groupBy({
        by: ["transactionType", "applicantSex"],
        where: { shiftLogId: shiftId },
        _count: true,
    });

    const getStatsByType = (type: TransactionType) => {
        const groups = typeGroups.filter((g) => g.transactionType === type);
        const male = groups.find((g) => g.applicantSex === "MALE")?._count ?? 0;
        const female = groups.find((g) => g.applicantSex === "FEMALE")?._count ?? 0;
        const total = groups.reduce((sum, g) => sum + ((g._count as number | undefined) ?? 0), 0);

        return { total, male, female };
    };

    const walkins = getStatsByType("WALK_IN_REFERRAL");
    const online = getStatsByType("ONLINE_REFERRAL");
    const inhouse = getStatsByType("IN_HOUSE_RECRUITMENT");

    return { walkins, online, inhouse };
}

async function getShiftDemographics(shiftId: number, query: ShiftDetailsQueryType) {
    if (!query.analytics) return {};

    // Demographics
    const demoGroups = await TransactionModel.groupBy({
        by: ["demographics"],
        where: { shiftLogId: shiftId },
        _count: true,
    });
    const countByDemographic = (demographic: Demographic) =>
        demoGroups.find((g) => g.demographics.includes(demographic))?._count ?? 0;
    const firstTime = countByDemographic("FIRST_TIME_JOB_SEEKER");
    const pwd = countByDemographic("PERSONS_WITH_DISABILITY");
    const senior = countByDemographic("SENIOR_CITIZEN");
    const youngWorker = countByDemographic("YOUNG_WORKER");
    const workImmersion = countByDemographic("WORK_IMMERSION_INTERNSHIP");

    return { firstTime, pwd, senior, youngWorker, workImmersion };
}

async function getShiftOutcomes(shiftId: number, query: ShiftDetailsQueryType) {
    const { overview } = query;

    if (!overview || overview.length <= 0) return {};

    // Outcomes
    const outcomeGroups = await TransactionModel.groupBy({
        by: ["transactionOutcome"],
        where: { shiftLogId: shiftId },
        _count: true,
    });
    const countByOutcome = (outcome: Outcome) =>
        outcomeGroups.find((g) => g.transactionOutcome === outcome)?._count ?? 0;

    const none = overview.includes("none") ? countByOutcome("NONE") : undefined;
    const pending = overview.includes("pending") ? countByOutcome("PENDING") : undefined;
    const mismatch = overview.includes("mismatch") ? countByOutcome("MISMATCH") : undefined;
    const success = overview.includes("success") ? countByOutcome("SUCCESS") : undefined;

    return { none, pending, mismatch, success };
}

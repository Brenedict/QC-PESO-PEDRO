import type { Demographic, ESSStatus, Outcome, ShiftLog, TransactionType } from "@qcpesopedro/shared/prisma/client";
import ShiftModel from "../models/shift.model";
import DateUtil from "../utils/date.util";
import TransactionModel from "../models/transaction.model";
import type { ShiftLogFindManyArgs } from "@qcpesopedro/shared/prisma/models";
import { calcAvgShiftApproval } from "@qcpesopedro/shared/prisma/sql";
import prisma from "../config/prisma.config";

export default {
    async getShiftLogs(args?: ShiftLogFindManyArgs, startDate?: Date, endDate?: Date) {
        return ShiftModel.getShiftLogs({
            where: {
                OR: [
                    // All pending
                    { status: "PENDING" },

                    // All non-pending limited by date range
                    {
                        AND: [
                            { status: { not: "PENDING" } },
                            {
                                ...(startDate || endDate
                                    ? {
                                          timeIn: {
                                              ...(startDate ? { gte: startDate } : {}),
                                              ...(endDate ? { lte: endDate } : {}),
                                          },
                                      }
                                    : {}),
                            },
                        ],
                    },
                ],
                ...args?.where,
            },

            ...args,
        });
    },
    async getStatusCount(status: ESSStatus, startDate?: Date, endDate?: Date) {
        return ShiftModel.count({
            where: {
                ...(startDate || endDate
                    ? {
                          timeIn: {
                              ...(startDate ? { gte: startDate } : {}),
                              ...(endDate ? { lte: endDate } : {}),
                          },
                      }
                    : {}),
                status,
            },
        });
    },
    async getAvgApproval(startDate?: Date, endDate?: Date) {
        if (!startDate || !endDate) {
            startDate = new Date(0);
            endDate = new Date();
        }

        const result = await prisma.$queryRawTyped(calcAvgShiftApproval(startDate, endDate));
        const firstRow = result[0];
        const averageSecondsNum = firstRow?.averageSeconds ? firstRow.averageSeconds.toNumber() : 0;
        return DateUtil.formatInterval(averageSecondsNum);
    },

    async getShiftOverview(startDate?: Date, endDate?: Date) {
        const [shifts, pending, approved, revision, rejected, average] = await Promise.all([
            this.getShiftLogs(
                { include: { user: true, _count: { select: { transactions: true } } } },
                startDate,
                endDate
            ),
            this.getStatusCount("PENDING"), // pending is not affected by date range
            this.getStatusCount("APPROVED", startDate, endDate),
            this.getStatusCount("REVISION", startDate, endDate),
            this.getStatusCount("REJECTED", startDate, endDate),
            this.getAvgApproval(startDate, endDate),
        ]);
        return { pending, approved, revision, rejected, average, shifts };
    },

    async getShiftDetails(shiftId: number) {
        const total = await TransactionModel.count({ where: { shiftLogId: shiftId } });

        const sources = await getShiftSources(shiftId);
        const demographics = await getShiftDemographics(shiftId);
        const outcomes = await getShiftOutcomes(shiftId);

        return {
            total,
            ...sources,
            ...demographics,
            ...outcomes,
        };
    },

    isTodayShift(shift: ShiftLog) {
        const shiftIn = new Date(shift.timeIn);
        const { startDate, endDate } = DateUtil.buildDayRange(new Date()); // today
        return shiftIn >= startDate && shiftIn <= endDate;
    },
};

async function getShiftSources(shiftId: number) {
    // Sources
    const typeGroups = await TransactionModel.groupBy({
        by: ["transactionType"],
        where: { shiftLogId: shiftId },
        _count: true,
    });
    const countByType = (type: TransactionType) => typeGroups.find((g) => g.transactionType === type)?._count ?? 0;
    const walkins = countByType("WALK_IN_REFERRAL");
    const online = countByType("ONLINE_REFERRAL");
    const inhouse = countByType("IN_HOUSE_RECRUITMENT");

    return { walkins, online, inhouse };
}

async function getShiftDemographics(shiftId: number) {
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

async function getShiftOutcomes(shiftId: number) {
    // Outcomes
    const outcomeGroups = await TransactionModel.groupBy({
        by: ["transactionOutcome"],
        where: { shiftLogId: shiftId },
        _count: true,
    });
    const countByOutcome = (outcome: Outcome) =>
        outcomeGroups.find((g) => g.transactionOutcome === outcome)?._count ?? 0;
    const none = countByOutcome("NONE");
    const pending = countByOutcome("PENDING");
    const mismatch = countByOutcome("MISMATCH");
    const success = countByOutcome("SUCCESS");

    return { none, pending, mismatch, success };
}

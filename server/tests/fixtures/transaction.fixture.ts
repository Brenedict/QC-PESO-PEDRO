import { Demographic, Outcome, Sex, TransactionType } from "@qcpesopedro/shared/prisma/client";
import { TransactionCreateType } from "@qcpesopedro/shared/schema/transactions";
import DateUtil, { TODAY } from "../../src/utils/date.util";

export const buildMockTransaction = (userId: number, shiftLogId: number) => {
    return {
        id: 1,
        userId,
        shiftLogId,
        applicantFirstName: "John",
        applicantLastName: "Doe",
        applicantSex: Sex.MALE,
        transactionOutcome: Outcome.SUCCESS,
        transactionType: TransactionType.WALK_IN_REFERRAL,
        remarks: null,
        demographics: [Demographic.FIRST_TIME_JOB_SEEKER],
        createdAt: new Date("2026-08-19T08:15:00.000Z"),
    };
};

export const buildMockTransactions = (
    userId: number | null,
    shiftLogId: number | null
): (TransactionCreateType & { id: number })[] => {
    return [
        {
            id: 1,
            userId,
            shiftLogId,
            applicantFirstName: "John",
            applicantLastName: "Doe",
            applicantSex: Sex.MALE,
            transactionOutcome: Outcome.SUCCESS,
            transactionType: TransactionType.WALK_IN_REFERRAL,
            remarks: null,
            demographics: [Demographic.FIRST_TIME_JOB_SEEKER],
            createdAt: TODAY,
        },
        {
            id: 2,
            userId,
            shiftLogId,
            applicantFirstName: "Jane",
            applicantLastName: "Smith",
            applicantSex: Sex.FEMALE,
            transactionOutcome: Outcome.PENDING,
            transactionType: TransactionType.ONLINE_REFERRAL,
            remarks: "Awaiting approval",
            demographics: [Demographic.PERSONS_WITH_DISABILITY, Demographic.SENIOR_CITIZEN],
            createdAt: TODAY,
        },
        {
            id: 3,
            userId,
            shiftLogId,
            applicantFirstName: "Bob",
            applicantLastName: "Johnson",
            applicantSex: Sex.MALE,
            transactionOutcome: Outcome.MISMATCH,
            transactionType: TransactionType.IN_HOUSE_RECRUITMENT,
            remarks: "Mismatch in credentials",
            demographics: [Demographic.YOUNG_WORKER],
            createdAt: TODAY,
        },
        {
            id: 4,
            userId,
            shiftLogId,
            applicantFirstName: "Mike",
            applicantLastName: "Wazowski",
            applicantSex: Sex.MALE,
            transactionOutcome: Outcome.SUCCESS,
            transactionType: TransactionType.WALK_IN_REFERRAL,
            remarks: null,
            demographics: [Demographic.FIRST_TIME_JOB_SEEKER],
            createdAt: DateUtil.offsetDays(TODAY, -4),
        },
        {
            id: 5,
            userId,
            shiftLogId,
            applicantFirstName: "Peter",
            applicantLastName: "Mosley",
            applicantSex: Sex.FEMALE,
            transactionOutcome: Outcome.PENDING,
            transactionType: TransactionType.ONLINE_REFERRAL,
            remarks: "Awaiting approval",
            demographics: [Demographic.PERSONS_WITH_DISABILITY, Demographic.SENIOR_CITIZEN],
            createdAt: DateUtil.offsetDays(TODAY, -2),
        },
        {
            id: 6,
            userId,
            shiftLogId,
            applicantFirstName: "Shrek",
            applicantLastName: "Yo",
            applicantSex: Sex.MALE,
            transactionOutcome: Outcome.MISMATCH,
            transactionType: TransactionType.IN_HOUSE_RECRUITMENT,
            remarks: "Mismatch in credentials",
            demographics: [Demographic.YOUNG_WORKER],
            createdAt: DateUtil.offsetDays(TODAY, -7),
        },
    ];
};

type Breakdown = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
type GroupByTypes = "applicantSex" | "transactionType" | "transactionOutcome" | "demographics" | "userId";

const getGroupValues = (transaction: TransactionCreateType, groupBy: GroupByTypes): (number | string)[] => {
    if (groupBy === "demographics") {
        return (transaction.demographics as string[] | undefined) ?? [];
    }

    const value = transaction[groupBy];

    return value == null ? [] : [value];
};

export const getTransactionsInRange = (
    transactions: TransactionCreateType[],
    startDate?: Date | string,
    endDate?: Date | string
) => {
    if (startDate) startDate = new Date(startDate);
    if (endDate) endDate = new Date(endDate);

    return transactions.filter((transaction) => {
        if (!transaction.createdAt) return false;

        const date = new Date(transaction.createdAt);

        if (startDate && date < startDate) return false;
        if (endDate && date >= endDate) return false;

        return true;
    });
};

export const getExpectedGrouped = (transactions: TransactionCreateType[], groupBy: GroupByTypes) => {
    return transactions.reduce(
        (result, transaction) => {
            const value = transaction[groupBy] as string;
            if (value == null) return result;
            result[value] = (result[value] ?? 0) + 1;
            return result;
        },
        {} as Record<string, number>
    );
};

export const getExpectedBreakdown = (
    transactions: TransactionCreateType[],
    breakdown: Breakdown,
    startDate?: Date | string,
    endDate?: Date | string
) => {
    const result: Record<string, number> = {};

    for (const transaction of getTransactionsInRange(transactions, startDate, endDate)) {
        const date = new Date(transaction.createdAt!);
        const bucketDate = breakdown === "WEEKLY" ? DateUtil.buildWeekRange(date).startDate : date;
        const bucket = DateUtil.formatDateBucket(bucketDate, breakdown);

        result[bucket] = (result[bucket] ?? 0) + 1;
    }

    return result;
};

export const getExpectedGroupedBreakdown = (
    transactions: TransactionCreateType[],
    breakdown: Breakdown,
    groupBy: GroupByTypes,
    startDate?: Date | string,
    endDate?: Date | string
) => {
    const result: Record<string, Record<string, number>> = {};

    for (const transaction of getTransactionsInRange(transactions, startDate, endDate)) {
        const date = new Date(transaction.createdAt!);
        const bucketDate = breakdown === "WEEKLY" ? DateUtil.buildWeekRange(date).startDate : date;
        const bucket = DateUtil.formatDateBucket(bucketDate, breakdown);
        const groupValues = getGroupValues(transaction, groupBy);

        result[bucket] ??= {};

        for (const groupValue of groupValues) {
            result[bucket][groupValue] = (result[bucket][groupValue] ?? 0) + 1;
        }
    }

    return result;
};

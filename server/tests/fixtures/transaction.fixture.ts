import { Demographic, Outcome, Sex, Transaction, TransactionType } from "@qcpesopedro/shared/prisma/client";
import { TransactionCreateType } from "@qcpesopedro/shared/schema/transactions";

export const TODAY = new Date("2026-08-19T00:00:00.000Z");

export const YESTERDAY = new Date(TODAY.getDate() - 1);
YESTERDAY.setHours(0, 0, 0, 0);

export const TOMORROW = new Date(TODAY.getDate() + 1);
TOMORROW.setHours(23, 59, 59, 999);

export const buildMockTransactions = (
    userId: number,
    shiftLogId: number
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
            createdAt: new Date("2026-08-19T08:15:00.000Z"),
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
            createdAt: new Date("2026-08-19T08:45:00.000Z"),
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
            createdAt: new Date("2026-08-18T09:30:00.000Z"),
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
            createdAt: new Date("2026-08-18T10:15:00.000Z"),
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
            createdAt: new Date("2026-08-12T11:00:00.000Z"),
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
            createdAt: new Date("2026-07-20T14:30:00.000Z"),
        },
    ];
};

type Breakdown = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
type GroupByTypes = "applicantSex" | "transactionType" | "transactionOutcome" | "demographics" | "userId";

const getBreakdownBucket = (date: Date, breakdown: Breakdown): string => {
    switch (breakdown) {
        case "HOURLY":
            return date.toISOString().slice(11, 13);

        case "DAILY":
            return date.toISOString().slice(0, 10);

        case "WEEKLY": {
            const weekStart = new Date(date);
            const day = weekStart.getUTCDay();
            const diff = day === 0 ? -6 : 1 - day;

            weekStart.setUTCDate(weekStart.getUTCDate() + diff);

            return weekStart.toISOString().slice(0, 10);
        }

        case "MONTHLY":
            return date.toISOString().slice(0, 7);

        case "YEARLY":
            return date.toISOString().slice(0, 4);
    }
};

const getGroupValues = (transaction: TransactionCreateType, groupBy: GroupByTypes): string[] => {
    if (groupBy === "demographics") {
        return (transaction.demographics as string[] | undefined) ?? [];
    }

    const value =
        groupBy === "applicantFullName"
            ? `${transaction.applicantFirstName} ${transaction.applicantLastName}`
            : transaction[groupBy];

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
        const bucket = getBreakdownBucket(new Date(transaction.createdAt!), breakdown);

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
        const bucket = getBreakdownBucket(new Date(transaction.createdAt!), breakdown);
        const groupValues = getGroupValues(transaction, groupBy);

        result[bucket] ??= {};

        for (const groupValue of groupValues) {
            result[bucket][groupValue] = (result[bucket][groupValue] ?? 0) + 1;
        }
    }

    return result;
};

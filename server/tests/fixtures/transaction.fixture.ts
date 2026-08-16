import { Demographic, Outcome, Sex, TransactionType } from "@qcpesopedro/shared/prisma/client";
import { TransactionCreateType } from "@qcpesopedro/shared/schema/transactions";

export const buildMockTransactions = (
    userId: number,
    shiftLogId: number
): (TransactionCreateType & { id: number })[] => [
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
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last-week
    },
];

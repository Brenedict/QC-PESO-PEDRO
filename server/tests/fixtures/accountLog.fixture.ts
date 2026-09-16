import type { AccountLog } from "@qcpesopedro/shared/prisma/client";

// Note: IDs are omitted so Prisma auto-generates them, preventing unique constraint
// violations across test runs when deleteMany() doesn't cascade from parent tables.
export const buildMockAccountLog = (userId: number): Omit<AccountLog, "id"> => ({
    userId,
    logIn: new Date("2026-08-31T09:00:00.000Z"),
    logOut: new Date("2026-08-31T17:00:00.000Z"),
    reason: "End of shift",
    remarks: "Normal logout",
});

export const buildMockAccountLogs = (userId: number): Omit<AccountLog, "id">[] => [
    {
        userId,
        logIn: new Date("2026-08-29T09:00:00.000Z"),
        logOut: new Date("2026-08-29T17:00:00.000Z"),
        reason: "End of shift",
        remarks: null,
    },
    {
        userId,
        logIn: new Date("2026-08-30T09:00:00.000Z"),
        logOut: new Date("2026-08-30T17:30:00.000Z"),
        reason: "End of shift",
        remarks: null,
    },
    {
        userId,
        logIn: new Date("2026-08-31T09:00:00.000Z"),
        logOut: new Date("2026-08-31T17:00:00.000Z"),
        reason: "End of shift",
        remarks: "Normal logout",
    },
];

export const buildMockOpenAccountLog = (userId: number): Omit<AccountLog, "id"> => ({
    userId,
    logIn: new Date("2026-08-31T09:00:00.000Z"),
    logOut: null,
    reason: null,
    remarks: null,
});

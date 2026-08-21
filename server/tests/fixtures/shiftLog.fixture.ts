import type { ShiftLog } from "@qcpesopedro/shared/prisma/client";

export const buildMockShiftLog = (userId: number): ShiftLog => ({
    id: 1,
    userId,
    status: "PENDING",
    timeIn: new Date(),
    timeOut: new Date(),
    generalRemarks: null,
    adminRemarks: null,
    lastVerifiedBy: "someone",
    lastVerifiedAt: new Date(),
    environmentTags: ["APPLICANT_ISSUES"],
});

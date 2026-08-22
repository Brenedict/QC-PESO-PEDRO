import type { ShiftLog } from "@qcpesopedro/shared/prisma/client";

export const buildMockShiftLog = (userId: number): ShiftLog => ({
    id: 1,
    userId,
    status: "PENDING",
    timeIn: new Date(),
    timeOut: null,
    generalRemarks: null,
    adminRemarks: null,
    verifierId: null,
    lastVerifiedAt: null,
    environmentTags: ["APPLICANT_ISSUES"],
});

import type { AuditLogFormCreateType } from "@qcpesopedro/shared/schema/audit";
import type { LogAction } from "@qcpesopedro/shared/prisma/browser";

export const buildMockAuditLog = (userId: number, action: LogAction, affectedId: string = "1"): AuditLogFormCreateType => ({
    userId,
    actionPerformed: action,
    affectedRecordId: affectedId,
    changesDetails: `Test ${action}`,
    remarks: "-",
    createdAt: new Date(),
});
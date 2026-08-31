import { type AuditLogFormCreateType } from "@qcpesopedro/shared/schema/audit";
import type { Request, Response } from "express";
import type { Prisma, Role } from "@qcpesopedro/shared/prisma/browser";
import AuditModel from "../models/audit.model";
import type { LogAction, User } from "@qcpesopedro/shared/prisma/browser";
import type { AuditLogFindManyArgs } from "@qcpesopedro/shared/prisma/models";

export interface LogMetaData {
    actionPerformed: LogAction;
    user: { id: number; name: string; role: Role };
    affectedRecordId: string;
    changesDetails: string;
    createdAt?: Date;
    remarks?: string;
}

export const AUDIT_MESSAGE_MAP: Record<LogAction, (details: string) => string> = {
    TRANSACTION_CREATED: (details) => `Created transaction: ${details}`,
    TRANSACTION_EDITED: (details) => `Edited transaction: ${details}`,
    TRANSACTION_DELETED: (details) => `Deleted transaction: ${details}`,
    SUBMITTED_END_SHIFT_STATUS: (details) => `Submitted end shift status: ${details}`,
    TAGGED_END_SHIFT_STATUS_REJECTED: (details) => `Rejected end shift status: ${details}`,
    TAGGED_END_SHIFT_STATUS_REVISION: (details) => `Requested revision on end shift status: ${details}`,
    TAGGED_END_SHIFT_STATUS_APPROVE: (details) => `Approved end shift status: ${details}`,
    USER_CREATED: (details) => `Created user account: ${details}`,
    USER_DELETED: (details) => `Deleted user account: ${details}`,
    USER_PASSWORD_RESET: (details) => `Reset password for user: ${details}`,
    USER_PASSWORD_CHANGE: (details) => `Changed password for user: ${details}`,
    USER_EDITED: (details) => `Updated user details: ${details}`,
    USER_PROMOTED: (details) => `Promoted user: ${details}`,
    USER_DEMOTED: (details) => `Demoted user: ${details}`,
    USER_ACCOUNT_ENABLED: (details) => `Enabled user account: ${details}`,
    USER_ACCOUNT_DISABLED: (details) => `Disabled user account: ${details}`,
    EMAIL_SENT_RESET_LINK: (details) => `Sent password reset email to: ${details}`,
    EMAIL_SENT_PASSWORD_CHANGE: (details) => `Sent password change email to: ${details}`,
    REPORTS_DOWNLOAD_DAILY: (details) => `Downloaded daily report: ${details}`,
    REPORTS_DOWNLOAD_WEEKLY: (details) => `Downloaded weekly report: ${details}`,
    REPORTS_DOWNLOAD_MONTHLY: (details) => `Downloaded monthly report: ${details}`,
    REPORTS_DOWNLOAD_OVERALL: (details) => `Downloaded overall report: ${details}`,
};

export default {
    async createAuditLog(audit: AuditLogFormCreateType) {
        return AuditModel.createAuditLog(audit);
    },

    async formatAuditLog(metaData: LogMetaData) {
        const auditLog: AuditLogFormCreateType = {
            actionPerformed: metaData.actionPerformed,
            userId: metaData.user.id,
            affectedRecordId: String(metaData.affectedRecordId),
            createdAt: new Date(),
            changesDetails: AUDIT_MESSAGE_MAP[metaData.actionPerformed](metaData.changesDetails),
            remarks: metaData?.remarks ?? "-",
        };

        return await this.createAuditLog(auditLog);
    },

    async getAuditLogs(filters, args?: AuditLogFindManyArgs) {
        const where: Prisma.AuditLogWhereInput = {};

        return AuditModel.getAuditLogs({ where: { ...where, ...args?.where }, ...args });
    },

    async getTotalAuditLogCount() {
        return await AuditModel.count();
    },

    createAuditLogMetadata(
        res: Response,
        actionPerformed: LogAction,
        requestorId: number,
        requestorFullName: string,
        requestorRole: Role,
        recordType: "USER" | "TRANSACTION" | "SHIFT",
        affectedRecordId: string | number,
        changesDetails: string,
        remarks?: string
    ) {
        affectedRecordId = typeof affectedRecordId == "string" ? affectedRecordId : String(affectedRecordId);

        const affectedRecordFormatted: Record<string, (id: string) => string> = {
            USER: (id) => `Account: ${id}`,
            TRANSACTION: (id) => `Transaction: ${id}`,
            SHIFT: (id) => `Shift: ${id}`,
        };

        res.locals.auditMetadata = {
            actionPerformed: actionPerformed,
            user: { id: requestorId, name: requestorFullName, role: requestorRole },
            affectedRecordId: affectedRecordFormatted[recordType]?.(affectedRecordId),
            changesDetails: changesDetails,
            remarks: remarks,
        };
    },
};

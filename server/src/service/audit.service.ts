import { type AuditLogFormCreateType } from "@qcpesopedro/shared/schema/audit";
import type { Request, Response } from "express";
import type { Prisma } from "@qcpesopedro/shared/prisma/client";
import AuditModel from "../models/audit.model";
import { type LogMetaData } from "../models/audit.model";
import type { LogAction, User } from "@qcpesopedro/shared/prisma/browser";
import type { AuditLogFindManyArgs } from "@qcpesopedro/shared/prisma/models";

export const AUDIT_MESSAGE_MAP: Record<LogAction, (details: string) => string> = {
    TRANSACTION_CREATED: (details) => `Created transaction: ${details}`,
    TRANSACTION_EDITED: (details) => `Edited transaction: ${details}`,
    TRANSACTION_DELETED: (details) => `Deleted transaction: ${details}`,
    SUBMITTED_END_SHIFT_STATUS: (details) => `Submitted end shift status: ${details}`,
    TAGGED_END_SHIFT_STATUS_REJECTED: (details) => `Rejected end shift status: ${details}`,
    TAGGED_END_SHIFT_STATUS_REVISION: (details) => `Requested revision on end shift status: ${details}`,
    TAGGED_END_SHIFT_STATUS_APPROVE: (details) => `Approved end shift status: ${details}`,
    USER_CREATED: (details) => `Created user account: ${details}`,
    USER_PASSWORD_RESET: (details) => `Reset password for user: ${details}`,
    USER_PASSWORD_CHANGE: (details) => `Changed password for user: ${details}`,
    USER_EDITED: (details) => `Updated user details: ${details}`,
    USER_PROMOTED: (details) => `Promoted user: ${details}`,
    USER_DEMOTED: (details) => `Demoted user: ${details}`,
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

    async createFormattedAuditLog(metaData: LogMetaData, logAction: LogAction) {
        const auditLog: AuditLogFormCreateType = {
            actionPerformed: logAction,
            userId: metaData.user.id,
            affectedRecordId: String(metaData.affectedRecord),
            createdAt: new Date(),
            changesDetails: AUDIT_MESSAGE_MAP[logAction](metaData.changesDetails),
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

    createAuditLogMetadata(res: Response, user: User) {
        res.locals.auditMetadata = {
            user: { id: user.id, name: user.fullName, role: user.role },
            affectedRecord: user.id,
            changesDetails: user.fullName,
        };
    },
};

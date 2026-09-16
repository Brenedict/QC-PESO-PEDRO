import { type AuditLogFormCreateType, type AuditLogQueryType, type RecordType } from "@qcpesopedro/shared/schema/audit";
import type { Response } from "express";
import type { Role } from "@qcpesopedro/shared/prisma/browser";
import AuditModel from "../models/audit.model";
import NotificationModel from "../models/notification.model";
import type { LogAction } from "@qcpesopedro/shared/prisma/browser";
import type { AuditLogWhereInput } from "@qcpesopedro/shared/prisma/models";

export interface LogMetaData {
    actionPerformed: LogAction;
    user: { id: number; name: string; role: Role };
    affectedRecordId: string;
    changesDetails: string;
    createdAt?: Date;
    remarks?: string;
    recipientUserIds?: number[];
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
    REPORTS_DOWNLOAD_DAILY: (_details) => `Downloaded daily report`,
    REPORTS_DOWNLOAD_WEEKLY: (_details) => `Downloaded weekly report`,
    REPORTS_DOWNLOAD_MONTHLY: (_details) => `Downloaded monthly report`,
    REPORTS_DOWNLOAD_OVERALL: (_details) => `Downloaded overall report`,
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

        const created = await this.createAuditLog(auditLog);

        const recipientIds = metaData.recipientUserIds ? [...new Set(metaData.recipientUserIds)] : [];

        for (const recipientId of recipientIds) {
            try {
                await NotificationModel.createNotification({
                    recipientId,
                    auditLogId: created.id,
                });
            } catch (error) {
                console.error("Failed to create notification", error);
            }
        }

        return created;
    },

    async getAuditLogs(query: AuditLogQueryType) {
        const { startDate, endDate, actionPerformed, search } = query;

        return AuditModel.getAuditLogs({
            where: {
                AND: [
                    actionPerformed ? resolveRecordTypeQuery(actionPerformed) : {},
                    search
                        ? {
                              OR: [
                                  { changesDetails: { contains: search, mode: "insensitive" } },
                                  { remarks: { contains: search, mode: "insensitive" } },
                                  { user: { fullName: { contains: search, mode: "insensitive" } } },
                              ],
                          }
                        : {},
                ],
                createdAt:
                    startDate || endDate
                        ? {
                              ...(startDate && { gte: startDate }),
                              ...(endDate && { lte: endDate }),
                          }
                        : undefined,
            },
            orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        });
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
        recordType: RecordType,
        affectedRecordId: string | number,
        changesDetails: string,
        remarks?: string,
        recipientUserIds?: number | number[]
    ) {
        affectedRecordId = typeof affectedRecordId == "string" ? affectedRecordId : String(affectedRecordId);

        const normalizedRecipients =
            recipientUserIds == null
                ? undefined
                : Array.isArray(recipientUserIds)
                  ? recipientUserIds
                  : [recipientUserIds];

        const affectedRecordFormatted: Record<string, (id: string) => string> = {
            USER: (id) => `${id}`,
            TRANSACTION: (id) => `${id}`,
            SHIFT: (id) => `Shift-${id}`,
        };

        res.locals.auditMetadata = {
            actionPerformed: actionPerformed,
            user: { id: requestorId, name: requestorFullName, role: requestorRole },
            affectedRecordId: affectedRecordFormatted[recordType]?.(affectedRecordId),
            changesDetails: changesDetails,
            remarks: remarks,
            recipientUserIds: normalizedRecipients,
        };
    },
};

function resolveRecordTypeQuery(type: RecordType): AuditLogWhereInput {
    switch (type) {
        case "TRANSACTION":
            return {
                OR: [
                    { actionPerformed: "TRANSACTION_CREATED" },
                    { actionPerformed: "TRANSACTION_EDITED" },
                    { actionPerformed: "TRANSACTION_DELETED" },
                    { actionPerformed: "REPORTS_DOWNLOAD_DAILY" },
                    { actionPerformed: "REPORTS_DOWNLOAD_WEEKLY" },
                    { actionPerformed: "REPORTS_DOWNLOAD_MONTHLY" },
                    { actionPerformed: "REPORTS_DOWNLOAD_OVERALL" },
                ],
            };
        case "SHIFT":
            return {
                OR: [
                    { actionPerformed: "SUBMITTED_END_SHIFT_STATUS" },
                    { actionPerformed: "TAGGED_END_SHIFT_STATUS_APPROVE" },
                    { actionPerformed: "TAGGED_END_SHIFT_STATUS_REJECTED" },
                    { actionPerformed: "TAGGED_END_SHIFT_STATUS_REVISION" },
                ],
            };
        case "USER":
            return {
                OR: [
                    { actionPerformed: "USER_CREATED" },
                    { actionPerformed: "USER_PASSWORD_RESET" },
                    { actionPerformed: "USER_PASSWORD_CHANGE" },
                    { actionPerformed: "USER_EDITED" },
                    { actionPerformed: "USER_DELETED" },
                    { actionPerformed: "USER_PROMOTED" },
                    { actionPerformed: "USER_DEMOTED" },
                    { actionPerformed: "USER_ACCOUNT_ENABLED" },
                    { actionPerformed: "USER_ACCOUNT_DISABLED" },
                    { actionPerformed: "EMAIL_SENT_RESET_LINK" },
                    { actionPerformed: "EMAIL_SENT_PASSWORD_CHANGE" },
                ],
            };
    }
}

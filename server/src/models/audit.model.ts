// General Imports
import prisma from "../config/prisma.config";

import { type AuditLogFormCreateType } from "@qcpesopedro/shared/schema/audit";
import type { AuditLogCountArgs, AuditLogFindManyArgs } from "@qcpesopedro/shared/prisma/models";

export default {
    async createAuditLog(auditLog: AuditLogFormCreateType) {
        return prisma.auditLog.create({ data: auditLog });
    },

    async getAuditLogs(args: AuditLogFindManyArgs) {
        return prisma.auditLog.findMany({
            ...args,
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                    },
                },
            },
        });
    },

    async count(args?: AuditLogCountArgs) {
        return prisma.auditLog.count(args);
    },
};

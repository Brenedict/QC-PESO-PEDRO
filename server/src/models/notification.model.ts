// General Imports
import prisma from "../config/prisma.config";

import type { NotificationCreateArgs, NotificationFindManyArgs } from "@qcpesopedro/shared/prisma/models";

export default {
    async createNotification(data: NotificationCreateArgs["data"]) {
        return prisma.notification.create({ data });
    },

    async findForUser(recipientId: number, take: number = 15) {
        const query: NotificationFindManyArgs = {
            where: { recipientId },
            orderBy: { createdAt: "desc" },
            take,
            include: {
                auditLog: {
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
                },
            },
        };

        return prisma.notification.findMany(query);
    },

    async countUnread(recipientId: number) {
        return prisma.notification.count({ where: { recipientId, readAt: null } });
    },

    async markAllRead(recipientId: number) {
        return prisma.notification.updateMany({
            where: { recipientId, readAt: null },
            data: { readAt: new Date() },
        });
    },
};
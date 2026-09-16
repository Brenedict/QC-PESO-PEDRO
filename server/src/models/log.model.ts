import prisma from "../config/prisma.config";

import type {
    AccountLogCountArgs,
    AccountLogFindManyArgs,
    AccountLogUncheckedCreateInput,
    AccountLogGroupByArgs,
} from "@qcpesopedro/shared/prisma/models";

export default {
    async getAccountLogById(id: number) {
        return prisma.accountLog.findUnique({ where: { id } });
    },
    async getAccountLogs(args?: AccountLogFindManyArgs) {
        return prisma.accountLog.findMany(args);
    },

    async createAccountLog(data?: AccountLogUncheckedCreateInput) {
        return prisma.accountLog.create({ data });
    },

    async updateAccountLogById(id: number, data: AccountLogUncheckedCreateInput) {
        return prisma.accountLog.update({ where: { id }, data });
    },

    async updateAccountLogsByUserId(userId: number, data: AccountLogUncheckedCreateInput) {
        return prisma.accountLog.updateMany({ where: { userId }, data });
    },

    async count(args?: AccountLogCountArgs) {
        return prisma.accountLog.count(args);
    },

    async groupBy(args: AccountLogGroupByArgs) {
        // eslint-disable-next-line
        // @ts-ignore
        return prisma.user.groupBy(args);
    },
};

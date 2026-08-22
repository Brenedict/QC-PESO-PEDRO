// PEDRO SHARED IMPORTS
import type {
    ShiftLogCountArgs,
    ShiftLogCreateArgs,
    ShiftLogFindManyArgs,
    ShiftLogOrderByWithRelationInput,
    ShiftLogSelectScalar,
    ShiftLogWhereInput,
} from "@qcpesopedro/shared/prisma/models";

// Prisma.config
import prisma from "../config/prisma.config";

export default {
    async getShiftLogs(args?: ShiftLogFindManyArgs) {
        return prisma.shiftLog.findMany(args);
    },

    async getShiftLogById(id: number) {
        return prisma.shiftLog.findMany({ where: { id } });
    },

    async getShiftLogsByUserId(
        userId: number,
        where?: ShiftLogWhereInput,
        orderBy?: ShiftLogOrderByWithRelationInput,
        select?: ShiftLogSelectScalar
    ) {
        return prisma.shiftLog.findMany({ where: { userId, ...where }, orderBy, select });
    },

    async createShift(args: ShiftLogCreateArgs) {
        return prisma.shiftLog.create(args);
    },

    async count(args?: ShiftLogCountArgs) {
        return prisma.shiftLog.count(args);
    },
};

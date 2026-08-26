// PEDRO SHARED IMPORTS
import type {
    ShiftLogCountArgs,
    ShiftLogCreateArgs,
    ShiftLogCreateManyArgs,
    ShiftLogFindManyArgs,
    ShiftLogInclude,
    ShiftLogOrderByWithRelationInput,
    ShiftLogSelectScalar,
    ShiftLogUncheckedUpdateInput,
    ShiftLogUncheckedUpdateManyInput,
    ShiftLogUpdateArgs,
    ShiftLogWhereInput,
    UserInclude,
} from "@qcpesopedro/shared/prisma/models";

// Prisma.config
import prisma from "../config/prisma.config";

export default {
    async getShiftLogs(args?: ShiftLogFindManyArgs) {
        return prisma.shiftLog.findMany(args);
    },

    async getShiftLogById(id: number, include?: ShiftLogInclude) {
        return prisma.shiftLog.findUnique({ where: { id }, include });
    },

    async getShiftLogsByUserId(
        userId: number,
        where?: ShiftLogWhereInput,
        orderBy?: ShiftLogOrderByWithRelationInput,
        select?: ShiftLogSelectScalar,
        take?: number
    ) {
        return prisma.shiftLog.findMany({ where: { userId, ...where }, orderBy, select, take });
    },

    async createShift(args: ShiftLogCreateArgs) {
        return prisma.shiftLog.create(args);
    },

    async createShifts(args: ShiftLogCreateManyArgs) {
        return prisma.shiftLog.createManyAndReturn(args);
    },

    async updateShiftById(id: number, data: ShiftLogUncheckedUpdateInput) {
        return prisma.shiftLog.update({ where: { id }, data });
    },

    async count(args?: ShiftLogCountArgs) {
        return prisma.shiftLog.count(args);
    },
};

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
import type { DefaultArgs } from "@prisma/client/runtime/client";

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
        take?: number,
        include?: ShiftLogInclude<DefaultArgs>
    ) {
        const query: ShiftLogFindManyArgs = {
            where: { userId, ...where },
            orderBy,
            take,
        };

        if (select) {
            query.select = select;
        } else if (include) {
            query.include = include;
        }

        return prisma.shiftLog.findMany(query);
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

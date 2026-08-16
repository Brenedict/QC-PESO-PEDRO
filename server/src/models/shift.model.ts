import type {
    ShiftLogOrderByWithRelationInput,
    ShiftLogSelectScalar,
    ShiftLogWhereInput,
} from "@qcpesopedro/shared/prisma/models";
import prisma from "../config/prisma.config";

export default {
    async getShiftLogs(where?: ShiftLogWhereInput) {
        return prisma.shiftLog.findMany({ where });
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

    async createShift(userId: number) {
        return prisma.shiftLog.create({ data: { userId } });
    },
};

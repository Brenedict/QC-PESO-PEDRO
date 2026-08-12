import prisma from "../config/prisma.config";

export default {
    async getAll() {
        return prisma.transaction.findMany();
    },

    async getById(id: number) {
        return prisma.transaction.findUnique({ where: { id } });
    },

    async countByDate(date: Date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return prisma.transaction.count({
            where: {
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
        });
    },
};

import type { Outcome, TransactionType } from "@qcpesopedro/shared/prisma/client";
import prisma from "../config/prisma.config";
import type {
    TransactionUncheckedCreateInput,
    TransactionUncheckedUpdateInput,
} from "@qcpesopedro/shared/prisma/models";

export default {
    async getTransactions(transactionType?: TransactionType, transactionOutcome?: Outcome) {
        const filter: { transactionType?: TransactionType; transactionOutcome?: Outcome } = {};

        if (transactionType !== undefined) filter.transactionType = transactionType;
        if (transactionOutcome !== undefined) filter.transactionOutcome = transactionOutcome;

        return prisma.transaction.findMany({ where: filter });
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

    async transactionWithIdExists(id: number) {
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        return !!transaction;
    },

    async createTransaction(transaction: TransactionUncheckedCreateInput) {
        return prisma.transaction.create({ data: transaction });
    },

    async updateTransaction(id: number, transaction: TransactionUncheckedUpdateInput) {
        return prisma.transaction.update({ where: { id }, data: transaction });
    },

    async deleteTransaction(id: number) {
        return prisma.transaction.delete({ where: { id } });
    },
};

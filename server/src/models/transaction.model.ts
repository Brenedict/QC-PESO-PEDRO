import prisma from "../config/prisma.config";
import type { TransactionCreateType, TransactionUpdateType } from "@qcpedropeso/shared/schema/transactions";
import type {
    TransactionUncheckedCreateInput,
    TransactionUncheckedUpdateInput,
    TransactionWhereInput,
} from "@qcpedropeso/shared/prisma/models";
import type { TransactionFilters } from "../service/transaction.service";

export default {
    async getTransactions({ transactionType, transactionOutcome }: TransactionFilters) {
        const filter: TransactionWhereInput = {};

        if (transactionType !== undefined) filter.transactionType = transactionType;
        if (transactionOutcome !== undefined) filter.transactionOutcome = transactionOutcome;

        return prisma.transaction.findMany({ where: filter });
    },

    async getById(id: number) {
        return prisma.transaction.findUnique({ where: { id } });
    },

    async createTransaction(transaction: TransactionCreateType) {
        return prisma.transaction.create({ data: transaction as TransactionUncheckedCreateInput });
    },

    async updateTransaction(id: number, transaction: TransactionUpdateType) {
        return prisma.transaction.update({ where: { id }, data: transaction as TransactionUncheckedUpdateInput });
    },

    async deleteTransaction(id: number) {
        return prisma.transaction.delete({ where: { id } });
    },

    async count(where: TransactionWhereInput) {
        return prisma.transaction.count({ where });
    },
};

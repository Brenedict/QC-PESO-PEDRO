import prisma from "../config/prisma.config";
import type { TransactionCreateType, TransactionUpdateType } from "@qcpedropeso/shared/schema/transactions";
import type {
    TransactionOrderByWithRelationInput,
    TransactionUncheckedCreateInput,
    TransactionUncheckedUpdateInput,
    TransactionWhereInput,
} from "@qcpedropeso/shared/prisma/models";
import type { TransactionFilters } from "../service/transaction.service";
import type { Demographic } from "@qcpedropeso/shared/prisma/enums";

export default {
    async getTransactions(
        { transactionType, transactionOutcome, createdAt }: TransactionFilters = {} as TransactionFilters,
        orderBy?: TransactionOrderByWithRelationInput
    ) {
        const filter: TransactionWhereInput = {};

        if (transactionType !== undefined) filter.transactionType = transactionType;
        if (transactionOutcome !== undefined) filter.transactionOutcome = transactionOutcome;
        if (createdAt !== undefined) filter.createdAt = createdAt;

        return prisma.transaction.findMany({ where: filter, orderBy: orderBy ?? {} });
    },

    async getById(id: number) {
        return prisma.transaction.findUnique({ where: { id } });
    },

    async createTransaction(transaction: TransactionCreateType, txCode: string) {
        const data = { ...transaction, txCode } as TransactionUncheckedCreateInput;
        return prisma.transaction.create({ data });
    },

    async createTransactions(transactions: TransactionCreateType[], txCodes: string[]) {
        const minLen = Math.min(transactions.length, txCodes.length);
        const data = transactions
            .slice(0, minLen)
            .map((transaction, i) => ({ ...transaction, txCode: txCodes[i] }) as TransactionUncheckedCreateInput);

        return prisma.transaction.createMany({ data });
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

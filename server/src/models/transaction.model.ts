import prisma from "../config/prisma.config";
import type { TransactionCreateType, TransactionUpdateType } from "@qcpedropeso/shared/schema/transactions";
import type {
    TransactionFindManyArgs,
    TransactionOrderByWithRelationInput,
    TransactionUncheckedCreateInput,
    TransactionUncheckedUpdateInput,
    TransactionWhereInput,
} from "@qcpedropeso/shared/prisma/models";
import type { TransactionFilters } from "../service/transaction.service";

export default {
    async getTransactions(args: TransactionFindManyArgs) {
        return prisma.transaction.findMany(args);
    },

    async getById(id: number) {
        return prisma.transaction.findUnique({ where: { id } });
    },

    async getByTxCode(txCode: string) {
        return prisma.transaction.findUnique({ where: { txCode } });
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

    async updateTransactionById(id: number, transaction: TransactionUpdateType) {
        return prisma.transaction.update({ where: { id }, data: transaction as TransactionUncheckedUpdateInput });
    },

    async updateTransactionByTxCode(txCode: string, transaction: TransactionUpdateType) {
        return prisma.transaction.update({ where: { txCode }, data: transaction as TransactionUncheckedUpdateInput });
    },

    async deleteTransactionById(id: number) {
        return prisma.transaction.delete({ where: { id } });
    },

    async deleteTransactionByTxCode(txCode: string) {
        return prisma.transaction.delete({ where: { txCode } });
    },

    async count(where?: TransactionWhereInput) {
        return prisma.transaction.count({ where });
    },
};

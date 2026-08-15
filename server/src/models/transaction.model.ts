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
    async getTransactions(
        { transactionType, transactionOutcome, createdAt, page, limit }: TransactionFilters = {} as TransactionFilters,
        orderBy?: TransactionOrderByWithRelationInput
    ) {
        const args: TransactionFindManyArgs = { where: {} as TransactionWhereInput };

        if (transactionType) args.where!.transactionType = transactionType;
        if (transactionOutcome) args.where!.transactionOutcome = transactionOutcome;
        if (createdAt) args.where!.createdAt = createdAt;

        if (orderBy) args.orderBy = orderBy;
        if (limit !== undefined) args.take = limit;

        if (page !== undefined && limit !== undefined) {
            args.skip = (page - 1) * limit;
        }

        return prisma.transaction.findMany(args);
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

    async count(where?: TransactionWhereInput) {
        return prisma.transaction.count({ where: where ?? {} });
    },
};

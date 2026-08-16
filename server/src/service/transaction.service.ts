import type { Outcome, TransactionType } from "@qcpedropeso/shared/prisma/client";
import TransactionModel from "../models/transaction.model";
import type { TransactionCreateType } from "@qcpedropeso/shared/schema/transactions";
import type { DateTimeFilter, TransactionOrderByWithRelationInput } from "@qcpedropeso/shared/prisma/models";

export interface TransactionFilters {
    transactionType?: TransactionType;
    transactionOutcome?: Outcome;
    createdAt?: string | Date | DateTimeFilter<"Transaction">;
    page?: number;
    limit?: number;
    search?: string;
}

export default {
    getFormattedDate(date: Date) {
        // 081326 = 08/13/26
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);
        return `${mm}${yy}`;
    },

    extractIndexFromCode(txCode: string) {
        const separatedCodes = txCode.split("-");
        return parseInt(separatedCodes.at(-1) as string) + 1;
    },

    // Append a `code` field to a transaction object
    async createTransactionCode(date: Date = new Date(), len: number = 1) {
        const formattedDate = this.getFormattedDate(date);

        // Number of transactions for that specific day
        const ordered = await this.getTransactionsPerMonth(date, { txCode: "desc" });
        const nextIndex = ordered?.[0] ? this.extractIndexFromCode(ordered[0].txCode) : 1;

        return [...Array(len)].map((_, i) => `TX-${formattedDate}-${String(nextIndex + i).padStart(3, "0")}`);
    },

    async createTransactionWithCode(transaction: TransactionCreateType) {
        const date = transaction.createdAt ?? new Date();
        const code = (await this.createTransactionCode(date))[0] as string;
        return await TransactionModel.createTransaction(transaction, code);
    },

    async createTransactionsWithCode(transactions: TransactionCreateType[]) {
        // Bucket by day so each unique date only queries the DB once
        const buckets = new Map<string, TransactionCreateType[]>();
        for (const transaction of transactions) {
            const date = transaction.createdAt ?? new Date();
            const key = this.getFormattedDate(date);
            buckets.set(key, [...(buckets.get(key) ?? []), transaction]); // Append yung previous na bucket
        }

        const codes: string[] = [];
        for (const bucket of buckets.values()) {
            if (!bucket[0]) continue;
            const date = bucket[0].createdAt ?? new Date();
            codes.push(...((await this.createTransactionCode(date, bucket.length)) as string[]));
        }

        return TransactionModel.createTransactions(transactions, codes);
    },

    async getTransactionsPerDay(date: Date, orderBy?: TransactionOrderByWithRelationInput) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return await TransactionModel.getTransactions(
            {
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
            orderBy
        );
    },

    async getTransactionsPerMonth(date: Date, orderBy?: TransactionOrderByWithRelationInput) {
        const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

        return await TransactionModel.getTransactions(
            {
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
            orderBy
        );
    },

    async countByDay(date: Date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return TransactionModel.count({
            createdAt: {
                gte: start,
                lte: end,
            },
        });
    },

    async transactionWithIdExists(id: number) {
        const transaction = await TransactionModel.getById(id);
        return !!transaction;
    },

    async transactionWithTxCodeExists(txCode: string) {
        const transaction = await TransactionModel.getByTxCode(txCode);
        return !!transaction;
    },

    async resolveTransactionId(id: string) {
        // Determine if the param represents a numeric ID
        const isNumeric = /^\d+$/.test(id);
        const numericId = isNumeric ? parseInt(id, 10) : NaN;

        const exists = isNumeric
            ? await this.transactionWithIdExists(numericId)
            : await this.transactionWithTxCodeExists(id);

        return { isNumeric, numericId, exists };
    },
};

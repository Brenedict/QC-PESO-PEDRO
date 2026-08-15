import type { Outcome, TransactionType } from "@qcpedropeso/shared/prisma/client";
import TransactionModel from "../models/transaction.model";
import type { TransactionCreateType } from "@qcpedropeso/shared/schema/transactions";
import type { DateTimeFilter, TransactionOrderByWithRelationInput } from "@qcpedropeso/shared/prisma/models";

export interface TransactionFilters {
    transactionType?: TransactionType;
    transactionOutcome?: Outcome;
    createdAt?: string | Date | DateTimeFilter<"Transaction">;
}

export default {
    extractIndexFromCode(txCode: string) {
        const separatedCodes = txCode.split("-");
        return parseInt(separatedCodes.at(-1) as string) + 1;
    },

    // Append a `code` field to a transaction object
    async createTransactionCode(len: number = 1) {
        const date = new Date();

        // 081326 = 08/13/26
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);
        const formattedDate = `${mm}${dd}${yy}`;

        // Number of that transaction in that day
        const orderedTransactions = await this.getTransactionsPerDay(date, { txCode: "desc" });
        const nextIndex = orderedTransactions?.[0] ? this.extractIndexFromCode(orderedTransactions[0].txCode) : 1;

        const code =
            len <= 1
                ? `TX-${formattedDate}-${String(nextIndex).padStart(3, "0")}`
                : [...Array(len)].map((_, i) => `TX-${formattedDate}-${String(nextIndex + i).padStart(3, "0")}`);

        return code;
    },

    async createTransactionWithCode(transaction: TransactionCreateType) {
        return await TransactionModel.createTransaction(transaction, (await this.createTransactionCode()) as string);
    },

    async createTransactionsWithCode(transactions: TransactionCreateType[]) {
        return await TransactionModel.createTransactions(
            transactions,
            (await this.createTransactionCode(transactions.length)) as string[]
        );
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

    async countByDate(date: Date) {
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
};

import type { Outcome, Transaction, TransactionType } from "@qcpedropeso/shared/prisma/client";
import TransactionModel from "../models/transaction.model";

export interface TransactionFilters {
    transactionType?: TransactionType;
    transactionOutcome?: Outcome;
}

export type CodedTransaction = Transaction & { code: string | null };

export default {
    // Append a `code` field to a transaction object
    async setTransactionCode(transaction: Transaction) {
        const date = transaction.createdAt;

        // 081326 = 08/13/26
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);
        const formattedDate = `${mm}${dd}${yy}`;

        // Number of that transaction in that day
        const count = await this.countByDate(date);
        const code = `TXN-${formattedDate}-${String(count + 1).padStart(3, "0")}`;
        const codedTransaction: CodedTransaction = { ...transaction, code };

        return codedTransaction;
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

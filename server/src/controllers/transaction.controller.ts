import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import TransactionModel from "../models/transaction.model";
import type { Outcome, Transaction, TransactionType } from "@qcpesopedro/shared/prisma/client";
import {
    TransactionUncheckedCreateInputObjectSchema,
    TransactionUncheckedUpdateInputObjectSchema,
} from "@qcpesopedro/shared/zod/schemas";
import { validateSchema } from "../middlewares/zod.middleware";
import type { TransactionCreateInput, TransactionUncheckedCreateInput } from "@qcpesopedro/shared/prisma/models";
export type CodedTransaction = Transaction & { code: string | null };

// Append a `code` field to a transaction object
async function setTransactionCode(transaction: Transaction) {
    const date = transaction.createdAt;

    // 081326 = 08/13/26
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const formattedDate = `${mm}${dd}${yy}`;

    // Number of that transaction in that day
    const count = await TransactionModel.countByDate(date);
    const code = `TXN-${formattedDate}-${String(count + 1).padStart(3, "0")}`;
    const codedTransaction: CodedTransaction = { ...transaction, code };

    return codedTransaction;
}

export default {
    getTransactions: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const transactions = await TransactionModel.getTransactions(
                req.query.type as TransactionType,
                req.query.outcome as Outcome
            );

            const codedTransactions = await Promise.all(
                transactions.map((transaction) => setTransactionCode(transaction))
            );

            res.json(codedTransactions);
        },
    ],

    getTransactionById: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const transaction = await TransactionModel.getById(parseInt(req.params.transactionId as string));

            return transaction
                ? res.json(await setTransactionCode(transaction))
                : res.status(404).json({ error: "Transaction not found" });
        },
    ],

    postTransaction: [
        jwtAccessAuth,
        validateSchema(TransactionUncheckedCreateInputObjectSchema),
        async (req: Request, res: Response) => {
            const transaction = req.body as TransactionUncheckedCreateInput;
            await TransactionModel.createTransaction(transaction);
            res.status(201).json(req.body);
        },
    ],

    patch: [
        jwtAccessAuth,
        validateSchema(TransactionUncheckedUpdateInputObjectSchema),
        async (req: Request, res: Response) => {
            const id = parseInt(req.params.transactionId as string);
            const exists = await TransactionModel.transactionWithIdExists(id);

            if (!exists) res.status(404).json({ error: "Transaction not found" });

            await TransactionModel.updateTransaction(id, req.body as TransactionUncheckedCreateInput);
            res.status(201).json(req.body);
        },
    ],

    delete: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const id = parseInt(req.params.transactionId as string);
            const exists = await TransactionModel.transactionWithIdExists(id);

            if (!exists) res.status(404).json({ error: "Transaction not found" });

            await TransactionModel.deleteTransaction(id);
            res.status(204).end();
        },
    ],
};

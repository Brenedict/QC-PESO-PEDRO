import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import TransactionModel from "../models/transaction.model";
import type { Transaction } from "../../generated/prisma/browser";

type CodedTransaction = Transaction & { code: string | null };

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
    const code = `TX-${formattedDate}-${String(count + 1).padStart(3, "0")}`;
    const codedTransaction: CodedTransaction = { ...transaction, code };

    return codedTransaction;
}

export default {
    get: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            if (req.params.transactionId) {
                const transaction = await TransactionModel.getById(parseInt(req.params.transactionId as string));

                return transaction
                    ? res.json(await setTransactionCode(transaction))
                    : res.status(404).json({ error: "Transaction not found" });
            }

            const transactions = await TransactionModel.getAll();
            const codedTransactions = await Promise.all(
                transactions.map((transaction) => setTransactionCode(transaction))
            );

            res.json(codedTransactions);
        },
    ],
    post: [
        jwtAccessAuth,
        (req: Request, res: Response) => {
            console.log(req.body); // For testing: returns sent request body
            res.status(201).json(req.body);
        },
    ],

    patch: [
        jwtAccessAuth,
        (req: Request, res: Response) => {
            console.log(req.body); // For testing: returns sent request body
            res.status(201).json(req.body);
        },
    ],

    delete: [
        jwtAccessAuth,
        (_req: Request, res: Response) => {
            res.status(204).end();
        },
    ],
};

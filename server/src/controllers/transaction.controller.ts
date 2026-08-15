import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import TransactionModel from "../models/transaction.model";
import type { Outcome, Transaction, TransactionType } from "@qcpesopedro/shared/prisma/client";
import { validateSchema } from "../middlewares/zod.middleware";
import {
    TransactionFormCreateSchema,
    TransactionFormUpdateSchema,
    type TransactionCreateType,
    type TransactionUpdateType,
} from "@qcpesopedro/shared/schema/transactions";
import TransactionService from "../service/transaction.service";

export default {
    getTransactions: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const response: Record<string, Transaction[] | number> = {};

            if (req.query.page !== undefined && req.query.limit === undefined)
                res.status(400).json({ error: "Page query provided without limit" });

            response.transactions = (await TransactionModel.getTransactions({
                transactionType: req.query.type ? (req.query.type as TransactionType) : undefined,
                transactionOutcome: req.query.outcome ? (req.query.outcome as Outcome) : undefined,
                page: req.query.page ? parseInt(req.query.page as string) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
                search: req.query.search ? (req.query.search as string) : undefined,
            })) as Transaction[];

            if (req.query && req.query.limit) {
                // For filters, pagination, etc.
                // so that we know what is the original size
                response.originalSize = await TransactionModel.count();
            }

            response.responseSize = response.transactions.length;

            res.json(response);
        },
    ],

    getTransactionById: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const transaction = await TransactionModel.getById(parseInt(req.params.transactionId as string));
            return transaction ? res.json({ transaction }) : res.status(404).json({ error: "Transaction not found" });
        },
    ],

    postTransaction: [
        jwtAccessAuth,
        validateSchema(TransactionFormCreateSchema),
        async (req: Request, res: Response) => {
            const transaction = req.body as TransactionCreateType;
            const result = await TransactionService.createTransactionWithCode(transaction);
            res.status(201).json({ transaction: result });
        },
    ],

    patch: [
        jwtAccessAuth,
        validateSchema(TransactionFormUpdateSchema),
        async (req: Request, res: Response) => {
            const id = parseInt(req.params.transactionId as string);
            const exists = await TransactionService.transactionWithIdExists(id);

            if (!exists) return res.status(404).json({ error: "Transaction not found" });

            const transaction = await TransactionModel.updateTransaction(id, req.body as TransactionUpdateType);
            res.status(201).json({ transaction });
        },
    ],

    delete: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const id = parseInt(req.params.transactionId as string);
            const exists = await TransactionService.transactionWithIdExists(id);

            if (!exists) return res.status(404).json({ error: "Transaction not found" });

            await TransactionModel.deleteTransaction(id);
            res.status(204).end();
        },
    ],
};

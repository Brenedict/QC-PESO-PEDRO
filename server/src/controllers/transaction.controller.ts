import type { NextFunction, Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import TransactionModel from "../models/transaction.model";
import type { Outcome, TransactionType } from "@qcpesopedro/shared/prisma/client";
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
            const transactions = await TransactionModel.getTransactions({
                transactionType: req.query.type as TransactionType,
                transactionOutcome: req.query.outcome as Outcome,
            });

            res.json(transactions);
        },
    ],

    getTransactionById: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const transaction = await TransactionModel.getById(parseInt(req.params.transactionId as string));
            return transaction ? res.json(transaction) : res.status(404).json({ error: "Transaction not found" });
        },
    ],

    postTransaction: [
        jwtAccessAuth,
        validateSchema(TransactionFormCreateSchema),
        async (req: Request, res: Response) => {
            const transaction = req.body as TransactionCreateType;
            const result = await TransactionService.createTransactionWithCode(transaction);
            res.status(201).json(result);
        },
    ],

    patch: [
        jwtAccessAuth,
        validateSchema(TransactionFormUpdateSchema),
        async (req: Request, res: Response) => {
            const id = parseInt(req.params.transactionId as string);
            const exists = await TransactionService.transactionWithIdExists(id);

            if (!exists) res.status(404).json({ error: "Transaction not found" });

            await TransactionModel.updateTransaction(id, req.body as TransactionUpdateType);
            res.status(201).json(req.body);
        },
    ],

    delete: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const id = parseInt(req.params.transactionId as string);
            const exists = await TransactionService.transactionWithIdExists(id);

            if (!exists) res.status(404).json({ error: "Transaction not found" });

            await TransactionModel.deleteTransaction(id);
            res.status(204).end();
        },
    ],
};

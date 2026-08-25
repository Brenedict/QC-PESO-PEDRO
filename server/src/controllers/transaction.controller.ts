// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import {
    TransactionAnalyticsQuerySchema,
    TransactionFormCreateSchema,
    TransactionFormUpdateSchema,
    TransactionQuerySchema,
    type TransactionAnalyticsQueryType,
    type TransactionCreateType,
    type TransactionQueryType,
    type TransactionUpdateType,
} from "@qcpesopedro/shared/schema/transactions";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";
import { validateSchema } from "../middlewares/zod.middleware";

// Model
import TransactionModel from "../models/transaction.model";

// Service
import TransactionService from "../service/transaction.service";

export default {
    getTransactions: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("query", TransactionQuerySchema),
        async (req: Request, res: Response) => {
            const filters = TransactionService.parseTransactionQuery(req.query as unknown as TransactionQueryType);
            const transactions = await TransactionModel.getTransactions(filters);

            interface ResponseType {
                transactions: typeof transactions;
                responseSize: number;
                originalSize: number | undefined;
            }

            const response: ResponseType = {
                transactions,
                responseSize: transactions.length,
                originalSize: undefined,
            };

            if (req.query.limit !== undefined) {
                response.originalSize = await TransactionModel.count({ where: filters.where });
            }

            return res.json(response);
        },
    ],

    postAnalytics: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", TransactionAnalyticsQuerySchema),
        async (req: Request, res: Response) => {
            const query = TransactionService.parseTransactionAnalyticsQuery(
                req.body as unknown as TransactionAnalyticsQueryType
            );
            const response = await TransactionService.resolveAnalyticsFilter(query);

            res.json(response);
        },
    ],

    getTransactionById: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        async (req: Request, res: Response) => {
            const { transactionId } = req.params;

            // Determine if the param represents a numeric ID
            const isNumeric = /^\d+$/.test(transactionId as string);

            const transaction = isNumeric
                ? await TransactionModel.getById(parseInt(transactionId as string, 10))
                : await TransactionModel.getByTxCode(transactionId as string);

            return transaction ? res.json({ transaction }) : res.status(404).json({ error: "Transaction not found" });
        },
    ],

    postTransaction: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", TransactionFormCreateSchema),
        async (req: Request, res: Response) => {
            const transaction = req.body as TransactionCreateType;
            const result = await TransactionService.createTransactionWithCode(transaction);
            res.status(201).json({ transaction: result });
        },
    ],

    patchTransaction: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", TransactionFormUpdateSchema),
        async (req: Request, res: Response) => {
            const { transactionId } = req.params;
            const id = transactionId as string;
            const { isNumeric, numericId, exists } = await TransactionService.resolveTransactionId(id);

            if (!exists) return res.status(404).json({ error: "Transaction not found" });

            const transaction = isNumeric
                ? await TransactionModel.updateTransactionById(numericId, req.body as TransactionUpdateType)
                : await TransactionModel.updateTransactionByTxCode(id, req.body as TransactionUpdateType);
            res.status(200).json({ transaction });
        },
    ],

    deleteTransaction: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        async (req: Request, res: Response) => {
            const { transactionId } = req.params;
            const id = transactionId as string;
            const { isNumeric, numericId, exists } = await TransactionService.resolveTransactionId(id);

            if (!exists) return res.status(404).json({ error: "Transaction not found" });

            if (isNumeric) {
                await TransactionModel.deleteTransactionById(numericId);
            } else {
                await TransactionModel.deleteTransactionByTxCode(id);
            }
            res.status(204).end();
        },
    ],
};

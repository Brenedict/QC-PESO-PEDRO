import type { Request, Response } from "express";
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import TransactionModel from "../models/transaction.model";
import { validateSchema } from "../middlewares/zod.middleware";
import {
    TransactionAnalyticsQuerySchema,
    TransactionFormCreateSchema,
    TransactionFormUpdateSchema,
    TransactionQuerySchema,
    type TransactionCreateType,
    type TransactionUpdateType,
} from "@qcpesopedro/shared/schema/transactions";
import TransactionService from "../service/transaction.service";
import ValidateUtil from "../utils/validate.util";

export default {
    getTransactions: [
        jwtAccessAuth,
        async (req: Request, res: Response) => {
            const result = ValidateUtil.validateRequestData(TransactionQuerySchema, req.query, res);
            if (!result.success) return;

            const filters = TransactionService.parseTransactionQuery(result.data);
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
        async (req: Request, res: Response) => {
            const result = ValidateUtil.validateRequestData(TransactionAnalyticsQuerySchema, req.body, res);
            if (!result.success) return;

            const query = TransactionService.parseTransactionAnalyticsQuery(result.data);
            const response = await TransactionService.resolveAnalyticsFilter(query);

            res.json(response);
        },
    ],

    getTransactionById: [
        jwtAccessAuth,
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
        validateSchema(TransactionFormCreateSchema),
        async (req: Request, res: Response) => {
            const transaction = req.body as TransactionCreateType;
            const result = await TransactionService.createTransactionWithCode(transaction);
            res.status(201).json({ transaction: result });
        },
    ],

    patchTransaction: [
        jwtAccessAuth,
        validateSchema(TransactionFormUpdateSchema),
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

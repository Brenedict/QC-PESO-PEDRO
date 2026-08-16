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

            const startDateStr = req.query.startDate as string | undefined;
            const endDateStr = req.query.endDate as string | undefined;

            let startDate: Date | undefined;
            let endDate: Date | undefined;

            if (startDateStr) {
                startDate = new Date(startDateStr);
            }
            if (endDateStr) {
                endDate = new Date(endDateStr);
            }

            // Validate date range
            if (startDate && endDate && startDate > endDate)
                return res.status(400).json({ error: "Start date cannot be after end date" });

            //Validate page query
            if (req.query.page !== undefined && req.query.limit === undefined)
                res.status(400).json({ error: "Page query provided without limit" });

            response.transactions = (await TransactionModel.getTransactions(
                {
                    transactionType: req.query.type as TransactionType | undefined,
                    transactionOutcome: req.query.outcome as Outcome | undefined,
                    page: req.query.page ? parseInt(req.query.page as string) : undefined,
                    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
                    search: req.query.search as string | undefined,
                    createdAt:
                        startDate || endDate
                            ? {
                                  ...(startDate ? { gte: startDate } : {}),
                                  ...(endDate ? { lte: endDate } : {}),
                              }
                            : undefined,
                },
                { createdAt: "desc" }
            )) as Transaction[];

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

// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import { LogAction, type User } from "@qcpesopedro/shared/prisma/browser";
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
import { auditLog } from "../middlewares/audit.middleware";

// Model
import TransactionModel from "../models/transaction.model";

// Service
import TransactionService from "../service/transaction.service";
import AuditService from "../service/audit.service";

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
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const transaction = req.body as TransactionCreateType;

            // Main result following the request
            const result = await TransactionService.createTransactionWithCode(transaction);

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.TRANSACTION_CREATED,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "TRANSACTION",
                    result.id,
                    result?.applicantFullName ?? ""
                );
            }

            res.status(201).json({ transaction: result });
        },
    ],

    patchTransaction: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        validateSchema("body", TransactionFormUpdateSchema),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const { transactionId } = req.params;
            const id = transactionId as string;
            const { isNumeric, numericId, exists } = await TransactionService.resolveTransactionId(id);

            const transaction = req.body as TransactionUpdateType;

            if (!exists) return res.status(404).json({ error: "Transaction not found" });

            // Main result following the request
            const result = isNumeric
                ? await TransactionModel.updateTransactionById(numericId, transaction)
                : await TransactionModel.updateTransactionByTxCode(id, transaction);

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.TRANSACTION_EDITED,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "TRANSACTION",
                    result.id,
                    result?.applicantFullName ?? "",
                    Object.keys(transaction).join(", ")
                );
            }

            res.status(200).json({ result });
        },
    ],

    deleteTransaction: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.FRONTLINE),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const { transactionId } = req.params;
            const id = transactionId as string;
            const { isNumeric, numericId, exists } = await TransactionService.resolveTransactionId(id);

            if (!exists) return res.status(404).json({ error: "Transaction not found" });

            // Main result following the request
            let result;

            if (isNumeric) {
                result = await TransactionModel.deleteTransactionById(numericId);
            } else {
                result = await TransactionModel.deleteTransactionByTxCode(id);
            }

            if (result) {
                AuditService.createAuditLogMetadata(
                    res,
                    LogAction.TRANSACTION_DELETED,
                    requestor.id,
                    requestor?.fullName ?? "",
                    requestor.role,
                    "TRANSACTION",
                    result.id,
                    result?.applicantFullName ?? ""
                );
            }

            res.status(204).end();
        },
    ],

    postReportsDownload: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.SUPERADMIN),
        auditLog,
        async (req: Request, res: Response) => {
            // User Data of the Original Requestor
            const requestor = req.user as User;

            const type = req.params.type as string;

            const mapType: Record<string, LogAction> = {
                DAILY: LogAction.REPORTS_DOWNLOAD_DAILY,
                WEEKLY: LogAction.REPORTS_DOWNLOAD_WEEKLY,
                MONTHLY: LogAction.REPORTS_DOWNLOAD_MONTHLY,
                OVERALL: LogAction.REPORTS_DOWNLOAD_OVERALL,
            };

            if (!type) {
                return res.status(404).json({ error: "Missing parameter" });
            }
            const dateUnitCoverage = type.toUpperCase();
            AuditService.createAuditLogMetadata(
                res,
                mapType[dateUnitCoverage] ?? LogAction.REPORTS_DOWNLOAD_DAILY,
                requestor.id,
                requestor?.fullName ?? "",
                requestor.role,
                "TRANSACTION",
                "-",
                ""
            );

            res.status(200).end();
        },
    ],
};

import { type ActionFunctionArgs } from "react-router";
import { ROUTES, type transactionRootPage } from "../hooks/reroute";
import {
    TransactionFormCreateSchema,
    TransactionFormDeleteSchema,
    TransactionFormUpdateSchema,
} from "@qcpesopedro/shared/schema/transactions";
import { decode } from "../utils/hashids";
import type { Transaction } from "@qcpesopedro/shared/prisma/browser";
import {
    apiJson,
    buildDayRangeParam,
    buildParamString,
    ensureOk,
    redirectWithQuery,
    validateForm,
} from "./actionService";

// GET: Fetches all transactions
export const getTransactions =
    (daily: boolean) =>
    async ({ request }: ActionFunctionArgs) => {
        const dayRangeParam = daily ? buildDayRangeParam(new Date()) : {};
        const apiParams = buildParamString({ ...dayRangeParam });

        try {
            // Main Fetch Request
            const res = await apiJson(`/transaction?${apiParams}`, { method: "GET" });

            await ensureOk(res, "Failed to retrive transactions");

            return res.json();
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirectWithQuery(request, ROUTES.applicantForm.root);
        }
    };

// GET: Transaction id specific fetch
export const getTransactionById = async ({ params, request }: ActionFunctionArgs) => {
    try {
        const transactionId = decode(params.transactionId);

        // Main Fetch Request
        const res = await apiJson(`/transaction/${transactionId}`, { method: "GET" });

        await ensureOk(res, "Failed to fetch transaction");

        const transaction: Transaction = await res.json();

        return transaction;
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.applicantForm.root);
    }
};

// POST: Transaction Creation Method
export const createTransaction = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();

        const submitAction = formData.get("action");

        // Remove action before passing FormData to Zod
        // This is for save and add button
        formData.delete("action");

        // ZOD Schema Checking
        const transaction = validateForm(formData, TransactionFormCreateSchema, "Invalid transaction data");

        // Main Fetch Request
        const res = await apiJson("/transaction", { method: "POST", body: JSON.stringify(transaction) });

        await ensureOk(res, "Failed to create transaction");

        if (submitAction === "save-and-add") {
            return {
                success: true,
                action: "save-and-add",
            };
        }

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.applicantForm.root);
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.applicantForm.root);
    }
};

// DELETE: Transaction Deletion Method
export const deleteTransaction =
    (root: transactionRootPage) =>
    async ({ request }: ActionFunctionArgs) => {
        const nextPage = root === "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

        try {
            const formData = await request.formData();

            // ZOD Schema Checking
            const transaction = validateForm(formData, TransactionFormDeleteSchema, "Invalid transaction data");

            const txCode = transaction.txCode;

            // Main Fetch Request
            const res = await apiJson(`/transaction/${txCode}`, { method: "DELETE" });

            if (!res.ok) {
                throw new Error(`Failed to delete transaction ${res.status} ${res.json()}`);
            }

            // Returns to root directory + queries
            return redirectWithQuery(request, nextPage);
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirectWithQuery(request, nextPage);
        }
    };

// PATCH: Transaction Update Method
export const updateTransaction =
    (root: transactionRootPage) =>
    async ({ params, request }: ActionFunctionArgs) => {
        // URL Mapper
        const nextPage = root === "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

        try {
            const transactionId = decode(params.transactionId);

            const formData = await request.formData();

            // ZOD Schema Checking
            const transaction = validateForm(formData, TransactionFormUpdateSchema, "Invalid transaction update data");

            // Main Fetch Request
            const res = await apiJson(`/transaction/${transactionId}`, {
                method: "PATCH",
                body: JSON.stringify(transaction),
            });

            await ensureOk(res, "Failed to update transaction");

            // Returns to root directory + queries
            return redirectWithQuery(request, nextPage);
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirectWithQuery(request, nextPage);
        }
    };

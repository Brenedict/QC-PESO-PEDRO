// General Imports
import { type ActionFunctionArgs } from "react-router";

// PEDRO SHARED IMPORTS
import {
    TransactionFormCreateSchema,
    TransactionFormDeleteSchema,
    TransactionFormUpdateSchema,
    type TransactionAnalyticsFilterType,
} from "@qcpesopedro/shared/schema/transactions";
import type { Transaction } from "@qcpesopedro/shared/prisma/browser";

// API Services
import {
    apiJson,
    buildDayRangeParam,
    buildParamString,
    ensureOk,
    extractQueryToObject,
    redirectWithQuery,
    validateForm,
} from "./actionService";
import {
    DASHBOARD_DETAILS_REQUEST,
    DASHBOARD_OVERVIEW_REQUEST,
    TRANSACTION_REPORT_REQUEST,
    TRANSACTION_SUMMARY_REQUEST,
    type ReportTypes,
} from "./analyticsRequests";

// Utils
import { decode } from "../utils/hashids";

// Custom Hooks
import { ROUTES, type transactionRootPage } from "../hooks/reroute";

// GET: Fetches all transactions
export const getTransactions =
    (daily: boolean) =>
    async ({ request }: ActionFunctionArgs) => {
        // 8AM to 5PM
        const dayRangeParam = daily ? buildDayRangeParam(new Date()) : {};
        const otherParams = extractQueryToObject(request, ["page"]);
        const apiParams = buildParamString({ ...dayRangeParam, ...otherParams });

        try {
            // Main Fetch Request
            const res = await apiJson(`/transaction?${apiParams}`, { method: "GET" });

            await ensureOk(res, "Failed to retrive transactions");

            return res.json();
        } catch (err) {
            // 2nd Line of Defense on Unauthorized URL Access
            // Catches 401 (Hard URL redirect). Prevents page loader from infinite loading.
            if (err instanceof Response) throw err;

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
        // 2nd Line of Defense on Unauthorized URL Access
        // Catches 401 (Hard URL redirect). Prevents page loader from infinite loading.
        if (err instanceof Response) throw err;

        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.applicantForm.root);
    }
};

// GET: Transactions as recent activity
export const getRecentTransactions = async ({ request }: ActionFunctionArgs) => {
    const dayRangeParam = buildDayRangeParam(new Date());
    const apiParams = buildParamString({ ...dayRangeParam, include: ["user"], limit: "4" });
    console.log(`/transaction?${apiParams}`);

    try {
        // Main Fetch Request
        const res = await apiJson(`/transaction?${apiParams}`, { method: "GET" });
        await ensureOk(res, "Failed to fetch transaction");
        const transaction: Transaction = await res.json();

        return transaction;
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.profile.root);
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
        // 2nd Line of Defense on Unauthorized URL Access
        // Catches 401 (Hard URL redirect). Prevents page loader from infinite loading.
        if (err instanceof Response) throw err;

        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.applicantForm.root);
    }
};

// POST: Fetches analytics
export const getOverviewAnalytics = async ({ request }: ActionFunctionArgs) => {
    try {
        // Main Fetch Request
        const res = await apiJson("/transaction/analytics", {
            method: "POST",
            body: JSON.stringify(DASHBOARD_OVERVIEW_REQUEST),
        });

        await ensureOk(res, "Failed to query dashboard");

        return res.json();
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.profile.root);
    }
};

// POST: Fetches analytics details
export const getDetailsAnalytics =
    (filter?: TransactionAnalyticsFilterType) =>
    async ({ request }: ActionFunctionArgs) => {
        try {
            // Main Fetch Request
            const res = await apiJson("/transaction/analytics", {
                method: "POST",
                body: JSON.stringify(DASHBOARD_DETAILS_REQUEST(filter)),
            });

            await ensureOk(res, "Failed to query analytic details");
            return res.json();
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirectWithQuery(request, ROUTES.profile.root);
        }
    };

// POST: Fetches transaction summary
export const getTransactionSummary = async ({ request }: ActionFunctionArgs) => {
    try {
        // Main Fetch Request
        const res = await apiJson("/transaction/analytics", {
            method: "POST",
            body: JSON.stringify(TRANSACTION_SUMMARY_REQUEST),
        });

        await ensureOk(res, "Failed to query transaction summary");

        return res.json();
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.profile.root);
    }
};

// POST: Fetches transaction summary
export const getTransactionReport =
    (type: ReportTypes) =>
    async ({ request }: ActionFunctionArgs) => {
        try {
            // Main Fetch Request
            const res = await apiJson("/transaction/analytics", {
                method: "POST",
                body: JSON.stringify(TRANSACTION_REPORT_REQUEST(type)),
            });

            await ensureOk(res, "Failed to query transaction report");

            return res.json();
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirectWithQuery(request, ROUTES.profile.root);
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
            // 2nd Line of Defense on Unauthorized URL Access
            // Catches 401 (Hard URL redirect). Prevents page loader from infinite loading.
            if (err instanceof Response) throw err;

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
            // 2nd Line of Defense on Unauthorized URL Access
            // Catches 401 (Hard URL redirect). Prevents page loader from infinite loading.
            if (err instanceof Response) throw err;

            console.error(err);

            // Returns to root directory + queries
            return redirectWithQuery(request, nextPage);
        }
    };

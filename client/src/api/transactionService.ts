// General Imports
import { type ActionFunctionArgs } from "react-router";

//
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

// PEDRO SHARED IMPORTS
import type { Transaction, TransactionType } from "@qcpesopedro/shared/prisma/browser";
import {
    TransactionFormCreateSchema,
    TransactionFormDeleteSchema,
    TransactionFormUpdateSchema,
    type TransactionAnalyticsFilterType,
} from "@qcpesopedro/shared/schema/transactions";

// API Services
import { decode } from "../utils/hashids";
import {
    apiJson,
    ensureOk,
    extractQueryToObject,
    handleErrRedirect,
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
import type { MaterialIcon } from "../types/common";
import { buildDayRangeParam, buildParamString, getStartEndHour, type ParamArgs } from "./dateService";

// Custom Hooks
import { ROUTES, type transactionRootPage } from "../hooks/reroute";
import TokenStore from "./tokenStore";

// ------------------------- MAPS -------------------------------------------------------
export const DASHBOARD_CARD_MAP: Record<string, { title: string; specialIcon?: MaterialIcon }> = {
    total: { title: "Total Transaction" },
    "walk-in": { title: "Walk-in Transaction" },
    online: { title: "Online Referral" },
    "in-house": { title: "In-house Referral" },
    "work-immersion": { title: "Work Immersion", specialIcon: BusinessCenterOutlinedIcon },
    "job-seeker": { title: "First Time Job Seekers", specialIcon: AssignmentIndOutlinedIcon },
    pwd: { title: "Persons With Disability", specialIcon: AssignmentIndOutlinedIcon },
    senior: { title: "Senior Citizens", specialIcon: AssignmentIndOutlinedIcon },
    ["young-worker"]: { title: "Young Workers", specialIcon: AssignmentIndOutlinedIcon },
    ["success"]: { title: "Successful Referrals", specialIcon: BusinessCenterOutlinedIcon },
    ["pending"]: { title: "Pending Applications", specialIcon: FindInPageOutlinedIcon },
    ["mismatch"]: { title: "Mismatched Skills", specialIcon: FindInPageOutlinedIcon },
    ["none"]: { title: "None", specialIcon: FindInPageOutlinedIcon },
} as const;

export const RECENT_TRANSACTION_MAP: Record<TransactionType, string> = {
    WALK_IN_REFERRAL: DASHBOARD_CARD_MAP["walk-in"].title,
    ONLINE_REFERRAL: DASHBOARD_CARD_MAP.online.title,
    IN_HOUSE_RECRUITMENT: DASHBOARD_CARD_MAP["in-house"].title,
};

// ------------------------------- API --------------------------------------------------

// GET: Fetches all transactions
export const getTransactions =
    (daily: boolean) =>
    async ({ request }: ActionFunctionArgs) => {
        const user = TokenStore.getUser();

        const dayRangeParam = daily ? buildDayRangeParam(new Date()) : {};
        const { query } = extractQueryToObject(request, ["page", "timeframe"]);
        const startEndHour = getStartEndHour(query.startDate, query.endDate);

        const paramsObject: Record<string, string | string[]> = {
            ...dayRangeParam,
            ...query,
            ...startEndHour,
        };

        if (user) {
            if (daily) paramsObject.shiftLogId = String(user.shiftLogId); // Sa applicant form dapat sa current shift lang

            if (user.role === "FRONTLINE" && !daily) {
                paramsObject.userId = String(user.id); // Kapag history sa current user lang (Frontline)
            }
            if (user.role !== "FRONTLINE") {
                paramsObject.include = ["user"]; // View history, include users when user is atleast admin role
            }
        }

        const apiParams = buildParamString(paramsObject as ParamArgs);
        console.log(apiParams);

        try {
            // Main Fetch Request
            const res = await apiJson(`/transaction?${apiParams}`, { method: "GET" });

            await ensureOk(res, "Failed to retrive transactions");

            return res.json();
        } catch (err) {
            return handleErrRedirect(err, request, ROUTES.applicantForm.root);
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
        return handleErrRedirect(err, request, ROUTES.applicantForm.root);
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
        return handleErrRedirect(err, request, ROUTES.dashboard.root);
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
        return handleErrRedirect(err, request, ROUTES.applicantForm.root);
    }
};

// POST: Fetches analytics
export const getOverviewAnalytics = async ({ request }: ActionFunctionArgs) => {
    console.log(JSON.stringify(DASHBOARD_OVERVIEW_REQUEST()));
    try {
        // Main Fetch Request
        const res = await apiJson("/transaction/analytics", {
            method: "POST",
            body: JSON.stringify(DASHBOARD_OVERVIEW_REQUEST()),
        });

        await ensureOk(res, "Failed to query dashboard");

        return res.json();
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.dashboard.root);
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
            return handleErrRedirect(err, request, ROUTES.dashboard.root);
        }
    };

// POST: Fetches transaction summary
export const getTransactionSummary = async ({ request }: ActionFunctionArgs) => {
    try {
        // Main Fetch Request
        const res = await apiJson("/transaction/analytics", {
            method: "POST",
            body: JSON.stringify(TRANSACTION_SUMMARY_REQUEST()),
        });

        await ensureOk(res, "Failed to query transaction summary");

        return res.json();
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.dashboard.root);
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
            return handleErrRedirect(err, request, ROUTES.dashboard.root);
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
            return handleErrRedirect(err, request, nextPage);
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
            return handleErrRedirect(err, request, nextPage);
        }
    };

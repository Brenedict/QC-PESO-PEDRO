// General Imports
import { redirect, type ActionFunctionArgs } from "react-router";

// PEDRO SHARED IMPORTS
import { type AuditLogsResponseType } from "@qcpesopedro/shared/schema/audit";

// API Services
import { apiJson, ensureOk, handleErrRedirect, redirectWithQuery, validateForm } from "./actionService";

// Custom Hooks
import { ROUTES } from "../hooks/useNavigateDefault";

// GET: Fetches all logs
export const getAuditLogs = async ({ request }: ActionFunctionArgs) => {
    // const { query } = extractQueryToObject(request, ["page", "timeframe"]);
    // const apiParams = buildParamString(query);

    try {
        // Main Fetch Request
        const res = await apiJson(`/audit`, { method: "GET" });

        await ensureOk(res, "Failed to retrieve audit logs");

        const result: AuditLogsResponseType = await res.json();

        return result;
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

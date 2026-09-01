// General Imports
import { redirect, type ActionFunctionArgs } from "react-router";

// PEDRO SHARED IMPORTS
import { type AuditLogsResponseType } from "@qcpesopedro/shared/schema/audit";

// API Services
import {
    apiJson,
    ensureOk,
    extractQueryToObject,
    handleErrRedirect,
    redirectWithQuery,
    validateForm,
} from "./actionService";

// Custom Hooks
import { ROUTES } from "../hooks/useNavigateDefault";
import { buildDayRangeParam, buildParamString, getStartEndHour } from "./dateService";

// GET: Fetches all logs
export const getAuditLogs = async ({ request }: ActionFunctionArgs) => {
    const dayRangeParam = buildDayRangeParam(new Date());
    const { query } = extractQueryToObject(request, ["page", "timeframe"]);
    const startEndHour = getStartEndHour(query.startDate, query.endDate);

    const paramsObject: Record<string, string | string[]> = {
        ...dayRangeParam,
        ...query,
        ...startEndHour,
    };

    try {
        const apiParams = buildParamString(paramsObject);

        // Main Fetch Request
        const res = await apiJson(`/audit?${apiParams}`, { method: "GET" });

        await ensureOk(res, "Failed to retrieve audit logs");

        const result: AuditLogsResponseType = await res.json();

        return result;
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

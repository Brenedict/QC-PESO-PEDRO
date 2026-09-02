import type { LoaderFunctionArgs } from "react-router";
import { apiJson, ensureOk, handleErrRedirect } from "./actionService";
import { CONTEXT_ANALYTICS_REQUEST } from "./analyticsService";
import { buildMonthRangeParam, buildParamString } from "./dateService";
import { ROUTES } from "../hooks/useNavigateDefault";

export function findMostFrequent(grouped: Record<string, number> | undefined) {
    if (!grouped || Object.keys(grouped).length === 0) return null;
    const entries = Object.entries(grouped);
    const total = entries.reduce((sum, [, values]) => sum + values, 0);
    const [name, count] = entries.reduce((max, current) => (current[1] > max[1] ? current : max));
    return { name, count, percent: total > 0 ? Math.round((count / total) * 100) : 0 };
}

export const getContextAnalytics = async ({ request }: LoaderFunctionArgs) => {
    const monthParam = buildMonthRangeParam(new Date());
    const apiParams = buildParamString({ ...monthParam });
    try {
        // Transaction Fetch Request
        const transactionRes = await apiJson("/transaction/analytics", {
            method: "POST",
            body: JSON.stringify(CONTEXT_ANALYTICS_REQUEST()),
        });
        await ensureOk(transactionRes, "Failed to query transaction analytics");

        // Shift Fetch Request
        const shiftRes = await apiJson(`/shift/analytics?${apiParams}`, { method: "GET" });
        await ensureOk(shiftRes, "Failed to query shift analytics");

        const transaction = await transactionRes.json();
        const shift = await shiftRes.json();

        return { transaction, shift };
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.dashboard.root);
    }
};

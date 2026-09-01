import type { LoaderFunctionArgs } from "react-router";
import { ROUTES } from "../hooks/useNavigateDefault";
import { apiJson, ensureOk, extractQueryToObject, handleErrRedirect } from "./actionService";
import { buildDayRangeParam, buildParamString, getStartEndHour, type ParamArgs } from "./dateService";
import { decode } from "../utils/hashids";

export const getAccountLogOverview = async ({ request }: LoaderFunctionArgs) => {
    const dayRangeParam = buildDayRangeParam(new Date());
    const { query } = extractQueryToObject(request, ["page", "timeframe"]);
    const startEndHour = getStartEndHour(query.startDate, query.endDate);

    const paramsObject: Record<string, string | string[]> = {
        ...dayRangeParam,
        ...query,
        ...startEndHour,
    };

    try {
        const apiParams = buildParamString(paramsObject as ParamArgs);

        // Main Fetch Request
        const res = await apiJson(`/log?${apiParams}`, { method: "GET" });

        await ensureOk(res, "Failed to retrieve account logs");

        return res.json();
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.monitoring.root);
    }
};

export const getAccountLog = async ({ params, request }: LoaderFunctionArgs) => {
    try {
        const userId = decode(params.userId);

        // Main Fetch Request
        const res = await apiJson(`/log/${userId}`, { method: "GET" });

        await ensureOk(res, "Failed to retrieve account log details");

        return res.json();
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.monitoring.root);
    }
};

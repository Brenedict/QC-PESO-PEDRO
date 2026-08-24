import type { ActionFunctionArgs } from "react-router";
import { buildParamString, getStartEndHour, getTimeframeRange } from "./dateService";
import {
    apiJson,
    ensureOk,
    extractQueryToObject,
    handleErrRedirect,
    redirectWithQuery,
    validateForm,
} from "./actionService";
import { ROUTES } from "../hooks/reroute";
import { decode } from "../utils/hashids";
import { ShiftFormVerifySchema } from "@qcpesopedro/shared/schema/shift";

// GET: Fetches all shifts
export const getShifts = async ({ request }: ActionFunctionArgs) => {
    const { query, omitted } = extractQueryToObject(request, ["page", "timeframe"]);
    const dateRangeOption = query.timeframe === "overall" ? getTimeframeRange(omitted?.timeframe ?? "day") : {};
    const startEndHour = getStartEndHour(query.startDate, query.endDate);
    const apiParams = buildParamString({ ...query, ...dateRangeOption, ...startEndHour });

    console.log(apiParams);

    try {
        // Main Fetch Request
        const res = await apiJson(`/shift?${apiParams}`, { method: "GET" });

        await ensureOk(res, "Failed to retrieve shifts");

        return res.json();
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.endshift.root);
    }
};

// GET: Fetches one shift
export const getShiftDetailsOverview =
    (overview: boolean) =>
    async ({ params, request }: ActionFunctionArgs) => {
        try {
            const shiftId = decode(params.shiftId);

            // Main Fetch Request
            const res = await apiJson(`/shift/${shiftId}${overview ? "?overview=true" : "?transactions=true"}`, {
                method: "GET",
            });

            await ensureOk(res, "Failed to retrieve shift details");

            return res.json();
        } catch (err) {
            return handleErrRedirect(err, request, ROUTES.endshift.root);
        }
    };

// PATCH: Review shift (Admin)
export const patchReviewShift = async ({ params, request }: ActionFunctionArgs) => {
    try {
        const shiftId = decode(params.shiftId);

        const formData = await request.formData();
        const shift = validateForm(formData, ShiftFormVerifySchema, "Invalid shift verify data");
        console.log(shift);

        // Main Fetch Request
        const res = await apiJson(`/shift/${shiftId}/verify`, { method: "PATCH", body: JSON.stringify(shift) });

        await ensureOk(res, "Failed to review shift");

        return redirectWithQuery(request, ROUTES.endshift.root);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.endshift.root);
    }
};

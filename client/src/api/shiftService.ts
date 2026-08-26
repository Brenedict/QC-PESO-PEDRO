import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { buildParamString, getStartEndHour } from "./dateService";
import {
    apiJson,
    ensureOk,
    extractQueryToObject,
    getParentPath,
    handleErrRedirect,
    redirectWithQuery,
    validateForm,
} from "./actionService";
import { ROUTES } from "../hooks/reroute";
import { decode } from "../utils/hashids";
import {
    ShiftFormCreateSchema,
    ShiftFormEndSchema,
    ShiftFormVerifySchema,
    type ShiftDetailsQueryType,
    type ShiftQueryIncludeType,
} from "@qcpesopedro/shared/schema/shift";
import TokenStore from "./tokenStore";
import { logoutAction, logoutService } from "./authService";
import { apiFetch } from "./httpClient";

// GET: Fetches all shifts
export const getShifts =
    (include: ShiftQueryIncludeType[]) =>
    async ({ request }: LoaderFunctionArgs) => {
        const { query } = extractQueryToObject(request, ["page", "timeframe"]);
        const startEndHour = getStartEndHour(query.startDate, query.endDate);
        const apiParams = buildParamString({ ...query, ...startEndHour, include });

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
    (query: ShiftDetailsQueryType, useUserShift: boolean = false) =>
    async ({ params, request }: LoaderFunctionArgs) => {
        const apiParams = buildParamString(query as Record<string, string | string[]>);
        try {
            const userShiftId = TokenStore.getUser()?.shiftLogId;
            const shiftId = decode(params.shiftId);

            // Main Fetch Request
            const res = await apiJson(`/shift/${useUserShift && userShiftId ? userShiftId : shiftId}?${apiParams}`, {
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

        // Main Fetch Request
        const res = await apiJson(`/shift/${shiftId}/verify`, { method: "PATCH", body: JSON.stringify(shift) });

        await ensureOk(res, "Failed to review shift");

        return redirectWithQuery(request, ROUTES.endshift.root);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.endshift.root);
    }
};

// PATCH: Review shift (Frontline and above)
export const patchEndShift = async ({ request }: ActionFunctionArgs) => {
    const error = new Error("Failed to end shift.");
    try {
        const userShiftId = TokenStore.getUser()?.shiftLogId;
        if (!userShiftId) throw error;

        const formData = await request.formData();
        const shift = validateForm(formData, ShiftFormEndSchema, "Invalid shift end data");

        // Main Fetch Request
        const res = await apiJson(`/shift/${userShiftId}/end`, { method: "PATCH", body: JSON.stringify(shift) });
        await ensureOk(res, "Failed to end shift");

        // Logout of user
        const logOutRes = await logoutAction();

        if (logOutRes) {
            return logOutRes;
        }

        throw error;
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.auth.root);
    }
};

// GET: Loader for shift time in
export const shiftStatusLoader = async ({ request }: LoaderFunctionArgs) => {
    console.log("loader");
    const res = await apiFetch("/shift/status");

    const { pathname } = new URL(request.url);

    if (pathname.endsWith("/time-in")) {
        return null;
    }

    if (res.status === 409) {
        const basePath = pathname.endsWith("/") ? pathname : `${pathname}/`;

        throw redirect(`${basePath}time-in`);
    }

    if (!res.ok) {
        throw new Error(`Failed to verify shift status: ${res.status}`);
    }

    return null;
};

// POST: Creaet shift or log out user if cancelled
export const timeInShift = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();
        const shift = validateForm(formData, ShiftFormCreateSchema, "Invalid shift data");

        // Main Fetch Request
        const res = await apiJson("/shift", { method: "POST", body: JSON.stringify(shift) });
        await ensureOk(res, "Failed to create shift");
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.endshift.root);
    }

    const root = getParentPath(request, "time-in");
    return redirect(root);
};

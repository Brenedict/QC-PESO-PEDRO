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
import { ROUTES } from "../hooks/useNavigateDefault";
import { decode } from "../utils/hashids";
import {
    ShiftFormCreateSchema,
    ShiftFormEndSchema,
    ShiftFormVerifySchema,
    type ShiftDetailsQueryType,
    type ShiftQueryIncludeType,
} from "@qcpesopedro/shared/schema/shift";
import { logoutAction, logoutService } from "./authService";
import { apiFetch } from "./httpClient";
import { ShiftStatus } from "@qcpesopedro/shared/enums";
import InMemoryStore from "./inMemoryStore";

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
            let shiftUrl: string;

            if (useUserShift) {
                const { id: userShiftId } = InMemoryStore.getUser()?.shiftLog ?? {};
                if (!userShiftId) throw Error("Failed to get end shift details.");
                shiftUrl = `/shift/${userShiftId}`;
            } else {
                const shiftId = decode(params.shiftId);
                shiftUrl = `/shift/${shiftId}`;
            }

            // Main Fetch Request
            const res = await apiJson(`${shiftUrl}?${apiParams}`, {
                method: "GET",
            });

            await ensureOk(res, "Failed to retrieve shift details");
            return res.json();
        } catch (err) {
            return handleErrRedirect(err, request, ROUTES.dashboard.root);
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
export const patchEndShift =
    (redirect?: string) =>
    async ({ request }: ActionFunctionArgs) => {
        const error = new Error("Failed to end shift.");
        try {
            const { id: userShiftId } = InMemoryStore.getUser()?.shiftLog ?? {};
            if (!userShiftId) throw error;

            const formData = await request.formData();
            const shift = validateForm(formData, ShiftFormEndSchema, "Invalid shift end data");

            // Main Fetch Request
            const res = await apiJson(`/shift/${userShiftId}/end`, { method: "PATCH", body: JSON.stringify(shift) });
            await ensureOk(res, "Failed to end shift");

            InMemoryStore.setUserShiftLog(undefined);
            InMemoryStore.setUserIsRevising(false);
            InMemoryStore.setEndedShift(true);

            const userRole = InMemoryStore.getUser()?.role;
            if (!redirect && userRole !== "SUPERADMIN") {
                // Logout of user
                const logOutRes = await logoutService({ reason: "Ended Shift" });

                if (logOutRes) {
                    return logOutRes;
                }

                throw error;
            }

            if (redirect) return redirectWithQuery(request, redirect);
        } catch (err) {
            return handleErrRedirect(err, request, ROUTES.auth.root);
        }
    };

// PATCH: Review shift (Frontline and above)
export const patchReviseShift =
    (redirect: string) =>
    async ({ request }: ActionFunctionArgs) => {
        const error = new Error("Failed to revise shift.");
        try {
            const { id: revisionShiftId } = InMemoryStore.getRevisionShift() ?? {};
            if (!revisionShiftId) throw error;

            // Main Fetch Request
            const res = await apiJson(`/shift/${revisionShiftId}/revise`, { method: "PATCH" });
            await ensureOk(res, "Failed to revise shift");

            const { revisionShift } = await res.json();

            if (!revisionShift) throw error;

            InMemoryStore.setUserShiftLog(revisionShift); // Set current user shift to the revision shift
            InMemoryStore.setUserIsRevising(true);

            return redirectWithQuery(request, redirect);
        } catch (err) {
            return handleErrRedirect(err, request, ROUTES.auth.root);
        }
    };

// GET: Loader for shift time in
export const shiftStatusLoader = async ({ request }: LoaderFunctionArgs) => {
    const { pathname } = new URL(request.url);

    const shiftStatusRoutes = {
        [ShiftStatus.TIMEIN]: "time-in",
        [ShiftStatus.UNFINISHED]: "unfinished-shift",
        [ShiftStatus.REVISION]: "revision",
    } as const;

    const allowedPaths = Object.values(shiftStatusRoutes);

    // Don't redirect again if already on one of these pages
    if (allowedPaths.some((path) => pathname.endsWith(`/${path}`))) {
        return null;
    }

    const res = await apiJson("/shift/status", { method: "GET" });

    if (res.status === 409) {
        const body = await res.json();
        const shiftStatus = parseInt(body.shiftStatus);

        if (shiftStatus === ShiftStatus.REVISION) {
            InMemoryStore.setRevisionShift(body.revisionShift);
        }

        const route = shiftStatusRoutes[shiftStatus as ShiftStatus];

        if (route) {
            const basePath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

            throw redirect(`${basePath}/${route}`);
        }
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

        const { shiftLog } = await res.json();

        InMemoryStore.setUserShiftLog(shiftLog);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.auth.root);
    }

    const root = getParentPath(request, "time-in");
    return redirect(root);
};

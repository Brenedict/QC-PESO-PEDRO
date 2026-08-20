import { redirect } from "react-router";
import z from "zod";
import { apiFetch } from "./httpClient";

const JSON_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
} satisfies HeadersInit;

export const extractQuery = (request: Request, omit?: string[]) => {
    const query = new URL(request.url).searchParams;
    omit?.forEach((param) => query.delete(param));

    return query;
};

export const extractQueryToObject = (request: Request, omit?: string[]) => {
    return Object.fromEntries(extractQuery(request, omit));
};

export const redirectWithQuery = (request: Request, path: string) => {
    const query = extractQuery(request).toString();
    return redirect(`${path}?${query}`);
};

export const apiJson = async (route: string, options: RequestInit = {}) => {
    return apiFetch(route, {
        ...options,
        headers: {
            ...JSON_HEADERS,
            ...options.headers,
        },
        retry: true,
    });
};

export const ensureOk = async (res: Response, message: string) => {
    if (res.ok) {
        return res;
    }

    let errorMessage = `${message} (${res.status})`;

    try {
        const body = await res.json();

        if (body?.error) {
            errorMessage += `: \n${body.error}`;
        }
    } catch {
        // Skip if response is not a json
    }

    throw new Error(errorMessage);
};

export function validateForm<T extends z.ZodType>(
    formData: FormData,
    schema: T,
    errorMessage = "Invalid form data"
): z.output<T> {
    const result = schema.safeParse(formData);

    if (!result.success) {
        console.error(z.prettifyError(result.error));
        throw new Error(errorMessage);
    }

    return result.data;
}

// Philippines is in UTC +8
const PH_OFFSET = 8;

export function buildDayRangeParam(date: Date, startHour = 0, endHour = 23) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const startDate = new Date(Date.UTC(year, month, day, startHour - PH_OFFSET, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, day, endHour - PH_OFFSET, 59, 59, 999));

    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildWeekRangeParam(date: Date) {
    const currentDay = date.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + distanceToMonday, -PH_OFFSET, 0, 0, 0)
    );

    const friday = new Date(
        Date.UTC(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate() + 4, 23 - PH_OFFSET, 59, 59, 999)
    );

    return { startDate: monday.toISOString(), endDate: friday.toISOString() };
}

export function buildMonthRangeParam(date: Date) {
    const startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, -PH_OFFSET, 0, 0, 0));
    const endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23 - PH_OFFSET, 59, 59, 999));
    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildYearRangeParam(date: Date) {
    const year = date.getUTCFullYear();
    const startDate = new Date(Date.UTC(year, 0, 1, -PH_OFFSET, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, 11, 31, 23 - PH_OFFSET, 59, 59, 999));
    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildParamString(init?: string[][] | Record<string, string | string[]> | string | URLSearchParams) {
    if (typeof init === "string" || init instanceof URLSearchParams || Array.isArray(init)) {
        return new URLSearchParams(init).toString();
    }

    const params = new URLSearchParams();
    if (init) {
        for (const [key, value] of Object.entries(init)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else {
                params.append(key, value);
            }
        }
    }
    return params.toString();
}

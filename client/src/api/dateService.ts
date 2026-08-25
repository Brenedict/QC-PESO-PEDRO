import { redirect, type LoaderFunctionArgs } from "react-router";

export type ParamArgs = string[][] | Record<string, string | string[]> | string | URLSearchParams;
export type TIMEFRAME_RESULT = { startDate: string; endDate: string };

const parseLocalDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
};

// Turn startDate and endDate params into philippine time
export const getStartEndHour = (startDate?: string, endDate?: string) => {
    const result: Record<string, string> = {};

    if (startDate) {
        const start = parseLocalDate(startDate);
        start.setHours(0, 0, 0, 0);

        result.startDate = start.toISOString();
    }

    if (endDate) {
        const end = parseLocalDate(endDate);
        end.setHours(23, 59, 59, 999);

        result.endDate = end.toISOString();
    }

    return result;
};

export const getDateParams = () => {
    const todayParam = buildDayRangeParam(new Date());
    const weekParam = buildWeekRangeParam(new Date());
    const monthParam = buildMonthRangeParam(new Date());
    const yearParam = buildYearRangeParam(new Date());

    return { todayParam, weekParam, monthParam, yearParam };
};

export function getTimeframeRange(timeframe: string | undefined) {
    const now = new Date();

    switch (timeframe) {
        case "day":
            return buildDayRangeParam(now);
        case "week":
            return buildWeekRangeParam(now);
        case "month":
            return buildMonthRangeParam(now);
        case "year":
            return buildYearRangeParam(now);
        default:
            return undefined;
    }
}

export function buildDayRangeParam(date: Date, startHour = 0, endHour = 23) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startDate = new Date(year, month, day, startHour, 0, 0, 0);
    const endDate = new Date(year, month, day, endHour, 59, 59, 999);
    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildWeekRangeParam(
    date: Date,
    startDay: number = 1, // 0-6 (Default: Monday)
    endDay: number = 5 // 0-6 (Default: Friday)
) {
    const currentDay = date.getDay();

    // Calculate distance to the start day
    let distanceToStart = startDay - currentDay;
    if (distanceToStart > 0) {
        distanceToStart -= 7;
    }

    // Calculate distance to the end day
    let distanceToEnd = endDay - currentDay;
    if (distanceToEnd < 0) {
        distanceToEnd += 7;
    }

    // If end day comes chronologically before start day in our calculation,
    // push it to the next week cycle so the range remains valid
    if (distanceToEnd < distanceToStart) {
        distanceToEnd += 7;
    }

    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + distanceToStart, 0, 0, 0, 0);
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + distanceToEnd, 23, 59, 59, 999);

    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildMonthRangeParam(date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildYearRangeParam(date: Date) {
    const year = date.getFullYear();
    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildParamString(init?: ParamArgs) {
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

export function dateRangeRedirect(path: string, startDate: Date, endDate: Date) {
    const params = new URLSearchParams();
    const formatDate = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    params.set("startDate", formatDate(startDate));
    params.set("endDate", formatDate(endDate));
    return redirect(`${path}?${params.toString()}`);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const todayRedirectLoader = (loaderFn?: Function) => async (args: LoaderFunctionArgs) => {
    const url = new URL(args.request.url);

    const timeframe = url.searchParams.get("timeframe");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    if (timeframe === "overall") {
        return loaderFn ? await loaderFn(args) : null;
    }

    if (!startDate || !endDate) {
        const today = new Date();

        return dateRangeRedirect(url.pathname, today, today);
    }

    return loaderFn ? await loaderFn(args) : null;
};

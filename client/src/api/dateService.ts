export const TODAY_PARAM = buildDayRangeParam(new Date());
export const WEEK_PARAM = buildWeekRangeParam(new Date());
export const MONTH_PARAM = buildMonthRangeParam(new Date());
export const YEAR_PARAM = buildYearRangeParam(new Date());

export type TIMEFRAME_RESULT = { startDate: string; endDate: string };

export const TIMEFRAME_MAP: Record<string, TIMEFRAME_RESULT | undefined> = {
    day: TODAY_PARAM,
    week: WEEK_PARAM,
    month: MONTH_PARAM,
    year: YEAR_PARAM,
    overall: undefined,
} as const;

export const TIMEFRAME_TYPE = Object.fromEntries(Object.keys(TIMEFRAME_MAP).map((key) => [key, key]));

export function buildDayRangeParam(date: Date, startHour = 0, endHour = 23) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startDate = new Date(year, month, day, startHour, 0, 0, 0);
    const endDate = new Date(year, month, day, endHour, 59, 59, 999);
    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export function buildWeekRangeParam(date: Date) {
    const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + distanceToMonday, 0, 0, 0, 0);
    const friday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 23, 59, 59, 999);
    return { startDate: monday.toISOString(), endDate: friday.toISOString() };
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

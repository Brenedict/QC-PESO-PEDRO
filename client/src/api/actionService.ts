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
            errorMessage += `: ${body.error}`;
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

export function buildDayRangeParam(date: Date) {
    return { startDate: date.toISOString(), endDate: date.toISOString() };
}

export function buildParamString(init?: string[][] | Record<string, string> | string | URLSearchParams) {
    const params = new URLSearchParams(init);
    return params.toString();
}

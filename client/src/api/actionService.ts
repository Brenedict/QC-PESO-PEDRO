// General Imports
import { redirect } from "react-router";
import z from "zod";

// API Services
import { apiFetch } from "./httpClient";

// Custom Hooks
import { ROUTES } from "../hooks/reroute";

const JSON_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
} satisfies HeadersInit;

export const extractQuery = (request: Request, omit?: string[]) => {
    const query = new URL(request.url).searchParams;
    const omitted = omit?.map((param) => {
        const result = [param, query.get(param)];
        query.delete(param);
        return result;
    });

    return { query, omitted };
};

export const extractQueryToObject = (request: Request, omit?: string[]) => {
    const { query, omitted } = extractQuery(request, omit);

    const queryObject: Record<string, string> = Object.fromEntries(query);
    const omittedObject: Record<string, string> | undefined = omitted && Object.fromEntries(omitted);

    return { query: queryObject, omitted: omittedObject };
};

export const redirectWithQuery = (request: Request, path: string) => {
    const query = extractQuery(request).query.toString();
    return redirect(`${path}?${query}`);
};

export const handleErrRedirect = (err: unknown, request: Request, path: string) => {
    // 2nd Line of Defense on Unauthorized URL Access
    // Catches 401 (Hard URL redirect). Prevents page loader from infinite loading.
    if (err instanceof Response) throw err;

    console.error(err);

    // Returns to root directory + queries
    return redirectWithQuery(request, path);
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
            errorMessage += `: \n${JSON.stringify(body.error, null, 2)}`;
        }
    } catch {
        // Skip if response is not a json
    }

    if (!res.ok) {
        console.log(errorMessage);

        // Backup check for 401 Unauthorized response to redirect to login page
        if (res.status === 401) {
            throw redirect(ROUTES.auth.root);
        }

        if (res.status === 400) {
            throw res;
        }
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

export function getParentPath(request: Request, childPath: string) {
    const { pathname } = new URL(request.url);
    return pathname.replace(new RegExp(`/${childPath}/?$`), "") || "/";
}

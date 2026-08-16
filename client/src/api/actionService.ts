import { redirect } from "react-router";
import z from "zod";
import { apiFetch } from "./httpClient";

const JSON_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
} satisfies HeadersInit;

export const redirectWithQuery = (request: Request, path: string) => {
    const query = new URL(request.url).searchParams.toString();
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
        console.error(z.treeifyError(result.error));

        throw new Error(errorMessage);
    }

    return result.data;
}

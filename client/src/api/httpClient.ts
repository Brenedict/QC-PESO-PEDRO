// API Services
import type { ShouldRevalidateFunction } from "react-router";
import InMemoryStore from "./inMemoryStore";

export type FetchOptions = RequestInit & { retry?: boolean };

export const getApiUrl = (route: string): string => {
    const api = import.meta.env.API_URL ?? "http://localhost:3000/api/v1";
    const cleanRoute = route.trim().startsWith("/") ? route.trim() : `/${route.trim()}`;
    return `${api}${cleanRoute}`;
};

const addAuthHeader = (headers: HeadersInit = {}): HeadersInit => {
    const token = InMemoryStore.getAccessToken();
    if (token) {
        return {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return headers;
};

export const apiFetch = async (route: string, options: FetchOptions = {}): Promise<Response> => {
    const { retry = true, ...rest } = options;
    const headers = addAuthHeader(rest.headers as HeadersInit);
    const res = await fetch(getApiUrl(route), {
        ...rest,
        headers,
        credentials: "include",
    });

    // If we got 401 and haven't retried yet, try refreshing the token
    if (res.status === 401 && retry) {
        const refreshRes = await fetch(getApiUrl("/auth/refresh"), {
            method: "POST",
            credentials: "include",
        });

        if (refreshRes.ok) {
            const { accessToken } = await refreshRes.json();
            InMemoryStore.setAccessToken(accessToken);
            // retry original request with new token
            return await apiFetch(route, { ...rest, retry: false });
        }
    }

    return res;
};

export const ignoreQueries = (queries: string[]): ShouldRevalidateFunction => {
    return ({ currentUrl, nextUrl, formMethod, defaultShouldRevalidate }) => {
        // always revalidate (run loader) when we submit a form
        if (formMethod && formMethod.toUpperCase() !== "GET") {
            return defaultShouldRevalidate;
        }

        const getParamsWithoutIgnored = (url: URL) => {
            const params = [...url.searchParams.entries()]
                .filter(([key]) => !queries.includes(key))
                .sort(([a], [b]) => a.localeCompare(b));
            return JSON.stringify(params);
        };

        const current = getParamsWithoutIgnored(currentUrl);
        const next = getParamsWithoutIgnored(nextUrl);

        // false = don't revalidate when only ignored queries changed
        return current !== next;
    };
};

// API Services
import TokenStore from "./tokenStore";

export type FetchOptions = RequestInit & { retry?: boolean };

export const getApiUrl = (route: string): string => {
    const api = import.meta.env.API_URL ?? "http://localhost:3000/api/v1";
    const cleanRoute = route.trim().startsWith("/") ? route.trim() : `/${route.trim()}`;
    return `${api}${cleanRoute}`;
};

const addAuthHeader = (headers: HeadersInit = {}): HeadersInit => {
    const token = TokenStore.getAccessToken();
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
            TokenStore.setAccessToken(accessToken);
            // retry original request with new token
            return await apiFetch(route, { ...rest, retry: false });
        }
    }

    return res;
};

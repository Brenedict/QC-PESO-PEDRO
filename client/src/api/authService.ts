import { redirect } from "react-router";
import { apiFetch } from "./httpClient";
import TokenStore from "./tokenStore";
import { ROUTES } from "../hooks/reroute";

// Auth helpers

/*
    Initial '/protected' loader that checks for user authentication. 
    If the user is not authenticated, it will redirect to the login page.
*/
export const primaryAuthLoader = async () => {
    const isAuthenticated = await checkAuthService();
    if (!isAuthenticated) {
        throw redirect(ROUTES.auth.root);
    }
    const user = await getUserContextLoader();
    return { user };
};

export const checkAuthService = async (): Promise<boolean> => {
    try {
        const res = await apiFetch("/auth/protected");
        return res.ok;
    } catch (err) {
        console.error("Auth network error:", err);
        return false;
    }
};

export const logoutService = async (): Promise<boolean> => {
    try {
        const res = await apiFetch("/auth/logout", {
            retry: false,
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            TokenStore.setAccessToken(null);
        }

        return res.ok;
    } catch (err) {
        console.error("Logout network error:", err);
        return false;
    }
};

// GET: Fetches the data of the currently logged-in user. If the user is not authenticated, it will log them out and return null.
export const getUserContextLoader = async () => {
    try {
        const res = await apiFetch("/user/me", {
            retry: true,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            const error = (await res.json()).error;
            throw new Error(`Failed to get user data ${res.status} => ${error}`);
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        await logoutService();
        return null;
    }
};

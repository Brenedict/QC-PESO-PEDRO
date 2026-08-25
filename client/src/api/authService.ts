// General Imports
import { redirect, type LoaderFunctionArgs } from "react-router";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";

// API Services
import { apiFetch } from "./httpClient";
import TokenStore from "./tokenStore";

// Custom Hooks
import { ROUTES } from "../hooks/reroute";
import type { User } from "@qcpesopedro/shared/prisma/browser";

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
    TokenStore.setUser(user);
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

export const logoutAction = async () => {
    const success = await logoutService();

    if (success) {
        return redirect(ROUTES.auth.root);
    }
    return null;
};

export const requireAccess = (minLevel: AccessLevel, loaderFn?: Function) => {
    return async (args: any) => {
        // Fetch current user details
        const user = (await primaryAuthLoader()).user as User;

        if (!user || AccessLevel[user.role] < minLevel) {
            // Instantly redirect unauthorized roles before firing the endpoint loader
            throw redirect("/404");
        }

        // If authorized and a loader exists, proceed
        return loaderFn ? await loaderFn(args) : null;
    };
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

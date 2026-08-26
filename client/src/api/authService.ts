// General Imports
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import type { User } from "@qcpesopedro/shared/prisma/browser";

// API Services
import { apiFetch } from "./httpClient";
import InMemoryStore from "./inMemoryStore";
import { apiJson, ensureOk, handleErrRedirect } from "./actionService";

// Custom Hooks
import { ROUTES } from "../hooks/useNavigateDefault";

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
    InMemoryStore.setUser(user);
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
            InMemoryStore.setAccessToken(null);
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

export const checkResetToken = async ({ request }: ActionFunctionArgs) => {
    try {
        // Create URL object for query extraction
        const url = new URL(request.url);

        // Extract the 'token' query parameter
        const token = url.searchParams.get("token") ?? "";

        // Initial check for token length, prevents wasteful query on fake tokens
        if (token.trim().length === 0 || token.trim().length <= 63) {
            throw redirect(ROUTES.auth.root);
        }

        const res = await apiJson(`/auth/protected/reset-password?token=${token}`, { method: "GET" });

        const result: { isTokenExpired: boolean; email: string; message: string } = await res.json();

        // If (Expired/Invalid Token) handle as business logic instead of throwing an error
        if (res.status >= 400 && res.status < 500) {
            return {
                isTokenExpired: true,
                email: "",
                message: result.message,
            };
        }

        // Only responsible for 500 status codes
        await ensureOk(res, "Failed to authenticate reset token");

        return result;
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.auth.root, false);
    }
};

export const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<boolean | null> => {
    try {
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        e.preventDefault(); // Stop full page reload

        const response = await apiJson("/auth/forgot-password", {
            method: "PATCH",
            body: JSON.stringify({ email }),
        });

        return response.ok;
    } catch (err) {
        console.error(err);
        return null;
    }
};

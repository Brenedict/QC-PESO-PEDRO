import { apiFetch } from "./httpClient";
import TokenStore from "./tokenStore";

// Auth helpers
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

export const getUserContextLoader = async () => {
    try {
        const res = await apiFetch("/me", {
            retry: true,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to get user data ${res.status}`);
        }

        return res.json();
    } catch (err) {
        console.error(err);
        await logoutService();
        return null;
    }
};

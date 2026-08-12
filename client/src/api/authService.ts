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

import { apiFetch } from "./httpClient";
import TokenStore from "./tokenStore";

// Auth helpers
export const checkAuthService = async (): Promise<boolean> => {
    try {
        const res = await apiFetch("/protected");
        return res.ok;
    } catch (err) {
        console.error("Auth network error:", err);
        return false;
    }
};

export const logoutService = async (): Promise<boolean> => {
    try {
        const res = await apiFetch("/auth/logout", { method: "POST" });
        TokenStore.setAccessToken(null);
        return res.ok;
    } catch (err) {
        console.error("Logout network error:", err);
        return false;
    }
};

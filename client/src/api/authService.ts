let memoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    memoryAccessToken = token;
};

export const getApiUrl = (route: string) => {
    const api = import.meta.env.API_URL || "http://localhost:3000/api/v1";

    route = route.trim();

    if (!route.startsWith("/")) route = "/" + route;

    return `${api}${route}`;
};

export const checkAuthService = async () => {
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (memoryAccessToken) {
            headers["Authorization"] = `Bearer ${memoryAccessToken}`;
        }

        const res = await fetch(getApiUrl("/protected"), {
            headers,
            credentials: "include",
        });

        if (res.status === 200) {
            const data = await res.json();
            return data.email;
        }

        if (res.status === 401) {
            // Access token expired, attempt refresh
            const refreshRes = await fetch(getApiUrl("/auth/refresh"), {
                method: "POST",
                credentials: "include", // Automatically sends the refreshToken cookie
            });

            // Check if the new accessToken works
            if (refreshRes.ok) {
                const refreshData = await refreshRes.json();
                setAccessToken(refreshData.accessToken);

                const retryHeaders: Record<string, string> = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshData.accessToken}`,
                };

                const retry = await fetch(getApiUrl("/protected"), {
                    headers: retryHeaders,
                    credentials: "include",
                });
                if (retry.ok) {
                    const data = await retry.json();
                    return data.email;
                }
            }
        }
        return null;
    } catch (err) {
        console.error("Auth network error:", err);
        return null;
    }
};

export const logoutService = async () => {
    try {
        const res = await fetch(getApiUrl("/auth/logout"), {
            method: "POST",
            credentials: "include",
        });
        return res.ok;
    } catch (err) {
        console.error("Logout network error:", err);
        return false;
    }
};

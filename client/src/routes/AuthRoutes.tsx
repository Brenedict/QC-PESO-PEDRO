import { redirect, type RouteObject } from "react-router";
import LoginPage from "../pages/LoginPage";
import { checkAuthService } from "../api/authService";
import TokenStore from "../api/tokenStore";
import { apiFetch, getApiUrl } from "../api/httpClient";
import { ROUTES } from "../hooks/reroute";

export const authRoutes: RouteObject[] = [
    {
        path: "/auth",
        element: <LoginPage />,
        action: async ({ request }) => {
            const formData = await request.formData();
            const user = Object.fromEntries(formData);

            // May credentials include na
            const res = await apiFetch("/auth/login", {
                retry: false,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email: user.email, password: user.password }),
            });

            if (res.status === 200) {
                const data = await res.json();

                TokenStore.setAccessToken(data.accessToken);
                return redirect(ROUTES.dashboard.root);
            }
            alert("Invalid credentials");
        },
        loader: async () => {
            const success = await checkAuthService();
            if (success) {
                return redirect(ROUTES.dashboard.root);
            }
        },
    },
];

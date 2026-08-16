import { redirect, type RouteObject } from "react-router";
import LoginPage from "../pages/LoginPage";
import { checkAuthService } from "../api/authService";
import TokenStore from "../api/tokenStore";
import { apiFetch } from "../api/httpClient";
import { ROUTES } from "../hooks/reroute";
import SystemErrorPage from "../pages/SystemErrorPage";
import { LoginSchema } from "@qcpesopedro/shared/schema/login";

export const authRoutes: RouteObject[] = [
    {
        path: "/auth",
        element: <LoginPage />,
        errorElement: <SystemErrorPage />,
        action: async ({ request }) => {
            const formData = await request.formData();
            const result = LoginSchema.safeParse(formData);

            if (result.error) {
                alert("Invalid Credentials");
            }

            const user = result.data;

            // May credentials include na
            const res = await apiFetch("/auth/login", {
                retry: false,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email: user?.email, password: user?.password }),
            });

            if (res.status === 200) {
                const data = await res.json();

                TokenStore.setAccessToken(data.accessToken);
                return redirect(ROUTES.dashboard.root);
            }
            alert("Invalid credentials");
            return null;
        },
        loader: async () => {
            const success = await checkAuthService();
            if (success) {
                return redirect(ROUTES.dashboard.root);
            }
            return null;
        },
    },
];

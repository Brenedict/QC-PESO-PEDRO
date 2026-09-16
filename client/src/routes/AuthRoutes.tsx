// General Imports
import { redirect, useSearchParams, type ActionFunctionArgs, type RouteObject } from "react-router";

// PEDRO SHARED IMPORTS
import { LoginSchema } from "@qcpesopedro/shared/schema/login";

// Components
import LoginPage from "../pages/LoginPage";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";
import SystemErrorPage from "../pages/SystemErrorPage";

// API Services
import { checkAuthService, checkResetToken, handleForgotPassword } from "../api/authService";
import { apiFetch } from "../api/httpClient";
import InMemoryStore from "../api/inMemoryStore";

// Custom Hooks
import { ROUTES } from "../hooks/useNavigateDefault";

import { changePasswordPatch } from "../api/userService";
import { JSON_HEADERS } from "../api/actionService";

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
                headers: JSON_HEADERS,
                body: JSON.stringify({ email: user?.email, password: user?.password }),
            });

            if (res.status === 200) {
                const data = await res.json();

                InMemoryStore.setAccessToken(data.accessToken);
                return redirect(ROUTES.dashboard.root);
            }

            if (res.status === 401) {
                const data: { message: string } = await res.json();

                return redirect(`${ROUTES.auth.root}?NOTIF=${data.message}`);
            }

            if (res.status === 409) {
                const data: { message: string } = await res.json();

                return redirect(`${ROUTES.auth.root}?NOTIF=${data.message}`);
            }

            return null;
        },
        loader: async () => {
            try {
                const success = await checkAuthService();
                if (success) {
                    return redirect(ROUTES.dashboard.root);
                }
                return null;
            } catch (err) {
                return null;
            }
        },
    },
    {
        path: "forgot-password",
        element: <ForgotPassword onSubmit={handleForgotPassword} />,
    },
    {
        path: "reset-password",
        element: <ResetPassword onSubmit={changePasswordPatch} />,
        loader: checkResetToken,
    },
];

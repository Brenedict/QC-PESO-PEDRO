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
import { checkAuthService, handleForgotPassword } from "../api/authService";
import { apiFetch } from "../api/httpClient";
import TokenStore from "../api/tokenStore";

// Custom Hooks
import { ROUTES } from "../hooks/reroute";
import { apiJson, ensureOk, handleErrRedirect } from "../api/actionService";
import { UserFormChangePasswordSchema } from "@qcpesopedro/shared/schema/users";
import { changePasswordAction } from "../api/userService";

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
        element: <ResetPassword onSubmit={changePasswordAction} />,
        action: async ({ request }) => {
            const formData = await request.formData();
            const result = UserFormChangePasswordSchema.safeParse(formData);

            console.log(result);
        },
        loader: async ({ request }: ActionFunctionArgs) => {
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

                await ensureOk(res, "Failed to authenticate reset token");

                const result = (await res.json()) as Promise<{ isTokenExpired: boolean; email: string }>;

                console.log(result);

                return result;
            } catch (err) {
                return handleErrRedirect(err, request, ROUTES.auth.root, false);
            }
        },
    },
];

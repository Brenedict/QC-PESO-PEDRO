// General Imports
import { redirect, type ActionFunctionArgs } from "react-router";

// PEDRO SHARED IMPORTS
import {
    UserFormChangePasswordSchema,
    UserFormCreateSchema,
    UserFormUpdateSchema,
} from "@qcpesopedro/shared/schema/users";
import type { User } from "@qcpesopedro/shared/prisma/browser";

// API Services
import { apiJson, ensureOk, handleErrRedirect, redirectWithQuery, validateForm } from "./actionService";

// Utils
import { decode } from "../utils/hashids";

// Custom Hooks
import { ROUTES } from "../hooks/reroute";

// POST: User Creation Method
export const createUser = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();

        // ZOD Schema Checking
        const user = validateForm(formData, UserFormCreateSchema, "Invalid user data");

        // Main Fetch Request
        const res = await apiJson("/user", { method: "POST", body: JSON.stringify(user) });

        await ensureOk(res, "Failed to create user");

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

// PATCH: Applies to all user updates (included na here actions: disable, edit, demote/promote)
export const updateUser = async ({ params, request }: ActionFunctionArgs) => {
    try {
        const { userId } = params;
        const decodedId = Number(decode(userId));

        const formData = await request.formData();

        // ZOD Schema Checking
        const user = validateForm(formData, UserFormUpdateSchema, "Invalid user data");

        // Main Fetch Request
        const res = await apiJson(`/user/${decodedId}`, {
            method: "PATCH",
            body: JSON.stringify(user),
        });

        await ensureOk(res, "Failed to update user");

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

// PATCH: Special patch method for resetting password to default
export const resetPassword = async ({ params, request }: ActionFunctionArgs) => {
    try {
        const { userId } = params;

        const decodedId = Number(decode(userId));

        // Main Fetch Request
        const res = await apiJson(`/user/${decodedId}/reset-password`, { method: "PATCH" });

        await ensureOk(res, "Failed to reset password");

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

// GET: Fetches all users
export const getUsers = async ({ request }: ActionFunctionArgs) => {
    try {
        // Main Fetch Request
        const res = await apiJson("/user", { method: "GET" });

        await ensureOk(res, "Failed to retrieve users");

        return res.json();
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

// GET: User id specific fetch
export const getUserById = async ({ params, request }: ActionFunctionArgs) => {
    try {
        const decodedId = decode(params.userId);
        const userId = Number(decodedId);

        // Main Fetch Request
        const res = await apiJson(`/user/${userId}`, { method: "GET" });

        await ensureOk(res, "Failed to fetch user");

        const user: User = await res.json();

        return user;
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

export const manageUserAction = async ({ params, request }: ActionFunctionArgs) => {
    try {
        const { userId } = params;
        const decodedId = Number(decode(userId));
        const formData = await request.formData();

        const actionType = formData.get("manageAction");

        if (actionType === "deactivate") {
            const res = await apiJson(`/user/${decodedId}`, {
                method: "PATCH",
                body: JSON.stringify({ status: "DISABLED" }),
            });

            await ensureOk(res, "Failed to deactivate user");
        } else if (actionType === "reactivate") {
            const res = await apiJson(`/user/${decodedId}`, {
                method: "PATCH",
                body: JSON.stringify({ status: "LOGGED_OUT" }),
            });

            await ensureOk(res, "Failed to reactivate user");
        } else if (actionType === "delete") {
            const res = await apiJson(`/user/${decodedId}`, {
                method: "DELETE",
            });

            await ensureOk(res, "Failed to delete user");
        }

        // Returns to root directory and queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
    } catch (err) {
        return handleErrRedirect(err, request, ROUTES.userManagement.root);
    }
};

// Change password fetch but this one is used for the /reset-password
export const changePasswordPatch = async (formData: FormData, resetToken: string): Promise<number | null> => {
    try {
        const payload = validateForm(formData, UserFormChangePasswordSchema, "Invalid password credentials");

        const response = await apiJson(`/auth/change-password?token=${resetToken}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        // Returns to root directory and queries
        return response.status;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Change password fetch but this one is used for the /profile/change-password
export const changePasswordAction = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();

        const userId = parseInt(formData.get("id") as string);

        // Removes id to fit UserFormChangePasswordSchema
        formData.delete("id");

        const payload = validateForm(formData, UserFormChangePasswordSchema, "Invalid password credentials");

        const response = await apiJson(`/user/${userId}/change-password`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.status == 422 && result.code == "INCORRECT_PASSWORD") {
            return redirect(`${ROUTES.profile.changePassword}?INCORRECT_PASSWORD=${result.message}`);
        }

        if (response.status == 422 && result.code == "DUPLICATE_PASSWORD") {
            return redirect(`${ROUTES.profile.changePassword}?DUPLICATE_PASSWORD=${result.message}`);
        }

        // Returns to root directory and queries
        return redirect(`${ROUTES.profile.root}?passwordChangeStatus=${result.message}`);
    } catch (err) {
        console.error(err);
        return null;
    }
};

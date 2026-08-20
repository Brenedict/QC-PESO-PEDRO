import { redirect, type ActionFunctionArgs } from "react-router";
import { UserFormCreateSchema, UserFormUpdateSchema } from "@qcpesopedro/shared/schema/users";
import { decode } from "../utils/hashids";
import type { User } from "@qcpesopedro/shared/prisma/browser";
import { ROUTES } from "../hooks/reroute";
import { apiJson, ensureOk, redirectWithQuery, validateForm } from "./actionService";
import { apiFetch } from "./httpClient";

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
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
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
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
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
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
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
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
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
        console.error(err);

        // Returns to root directory + queries
        return redirectWithQuery(request, ROUTES.userManagement.root);
    }
};

export const manageUserAction = async ({ params, request }: ActionFunctionArgs) => {
    const url = new URL(request.url);
    const query = url.searchParams.toString();

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
        console.error(err);

        return redirectWithQuery(request, ROUTES.userManagement.root);
    }
};

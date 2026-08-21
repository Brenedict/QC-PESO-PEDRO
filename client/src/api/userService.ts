import { apiFetch } from "./httpClient";
import { redirect, type ActionFunctionArgs } from "react-router";
import { UserFormCreateSchema, UserFormUpdateSchema } from "@qcpesopedro/shared/schema/users";
import { decode } from "../utils/hashids";
import type { User } from "@qcpesopedro/shared/prisma/browser";
import { ROUTES } from "../hooks/reroute";

// POST: User Creation Method
export const createUser = async ({ request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const formData = await request.formData();

        // ZOD Schema Checking
        const result = UserFormCreateSchema.safeParse(formData);
        if (!result.success) {
            console.error(result.error.flatten().fieldErrors);

            throw new Error("Invalid user data");
        }

        const user = result.data;

        // Main Fetch Request
        const res = await apiFetch("/user", {
            retry: true,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error(`Failed to create user ${res.status}`);
        }

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    }
};

// PATCH: Applies to all user updates (included na here actions: disable, edit, demote/promote)
export const updateUser = async ({ params, request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const { userId } = params;

        const formData = await request.formData();

        // ZOD Schema Checking
        const result = UserFormUpdateSchema.safeParse(formData);
        if (!result.success) {
            console.error(result.error.flatten().fieldErrors);

            throw new Error("Invalid user data");
        }

        const decodedId = Number(decode(userId));
        const user = result.data;

        // Main Fetch Request
        const res = await apiFetch(`/user/${decodedId}`, {
            retry: true,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error(`Failed to update user ${res.status}`);
        }

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    }
};

// PATCH: Special patch method for resetting password to default
export const resetPassword = async ({ params, request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const { userId } = params;

        const decodedId = Number(decode(userId));

        // Main Fetch Request
        const res = await apiFetch(`/user/${decodedId}/reset-password`, {
            retry: true,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to reset password ${res.status}`);
        }

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    }
};

// GET: Fetches all users
export const getUsers = async ({ request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        // Main Fetch Request
        const res = await apiFetch("/user", {
            retry: true,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to retrieve users: ${res.status}`);
        }

        return res.json();
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    }
};

// GET: User id specific fetch
export const getUserById = async ({ params, request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const decodedId = decode(params.userId);
        const userId = Number(decodedId);

        // Main Fetch Request
        const res = await apiFetch(`/user/${userId}`, {
            retry: true,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch user ${res.status}`);
        }

        const user: User = await res.json();

        return user;
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
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
            const res = await apiFetch(`/user/${decodedId}`, {
                retry: true,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ status: "DISABLED" }),
            });

            if (!res.ok) throw new Error(`Failed to deactivate user ${res.status}`);
        } else if (actionType === "reactivate") {
            const res = await apiFetch(`/user/${decodedId}`, {
                retry: true,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ status: "LOGGED_OUT" }),
            });

            if (!res.ok) throw new Error(`Failed to reactivate user ${res.status}`);
        } else if (actionType === "delete") {
            const res = await apiFetch(`/user/${decodedId}`, {
                retry: true,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!res.ok) throw new Error(`Failed to delete user ${res.status}`);
        }

        // Returns to root directory and queries
        return redirect(`${ROUTES.userManagement.root}?${query}`);
    } catch (err) {
        console.error(err);

        return redirect(`${ROUTES.userManagement.root}?${query}`);
    }
};

export const changePasswordAction = async ({ request }: ActionFunctionArgs) => {
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const formData = await request.formData();

        const payload = {
            currentPassword: formData.get("currentPassword"),
            newPassword: formData.get("newPassword"),
        };

        console.log("Form submitted successfully with payload:", payload);
        
        alert("TEST");

        return redirect(`${ROUTES.profile.root}?${query}`);
    } catch (err) {
        console.error(err);
        return redirect(`${ROUTES.profile.root}?${query}`);
    }
};
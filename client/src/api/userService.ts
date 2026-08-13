import { UserSchema } from "@qcpesopedro/shared/schema/users";
import { apiFetch } from "./httpClient";
import { redirect, type ActionFunctionArgs } from "react-router";

/*
    CURRENTLY THESE FETCH LOGIC ARE NOT FINAL, THEY ARE PROOF OF FUNCTION
*/

export const createUserAction = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();

        const result = UserSchema.safeParse(formData);
        if (!result.success) {
            console.error(result.error.flatten().fieldErrors);

            throw new Error("Invalid user data");
        }

        const user = result.data;

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

        return redirect("..");
    } catch (err) {
        console.error(err);
        return redirect("..");
    }
};
export async function getUsers() {
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
}

export async function getUserById(userId: number) {
    const res = await apiFetch(`/user/${userId}`, {
        retry: true,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to retrieve user: ${res.status}`);
    }

    return res.json();
}

import { apiFetch } from "./httpClient";

/*
    CURRENTLY THESE FETCH LOGIC ARE NOT FINAL, THEY ARE PROOF OF FUNCTION
*/
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

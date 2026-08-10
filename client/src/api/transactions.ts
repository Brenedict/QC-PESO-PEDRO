import type { Transaction } from "../validators/transactions";

/*
    CURRENTLY THESE FETCH LOGIC ARE NOT FINAL, THEY ARE PROOF OF FUNCTION
*/
export async function createTransaction(data: Transaction) {
    const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create transaction: ${response.status}`);
    }

    return response.json();
}

export async function editTransaction(data: Transaction) {
    const response = await fetch("/api/transaction", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to edit transaction: ${response.status}`);
    }

    console.log(response.status);

    return response.json();
}

export async function deleteTransaction(data: Transaction) {
    const response = await fetch("/api/transaction", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to delete transaction: ${response.status}`);
    }

    console.log(response.status);

    return response.status;
}

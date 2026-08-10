import type { Transaction } from "../validators/transactions";

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

import { redirect, type ActionFunctionArgs } from "react-router";
import { apiFetch } from "./httpClient";
import { ROUTES, type transactionRootPage } from "../hooks/reroute";
import {
    TransactionFormCreateSchema,
    TransactionFormDeleteSchema,
    TransactionFormUpdateSchema,
} from "@qcpesopedro/shared/schema/transactions";
import { decode } from "../utils/hashids";
import type { Transaction } from "@qcpesopedro/shared/prisma/browser";
import { z } from "zod";

// GET: Fetches all transactions
export const getTransactions = async ({ request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        // Main Fetch Request
        const res = await apiFetch("/transaction", {
            retry: true,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to retrieve transactions: ${res.status}`);
        }

        return res.json();
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.applicantForm.root}?${query}`);
    }
};

// GET: Transaction id specific fetch
export const getTransactionById = async ({ params, request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const transactionId = decode(params.transactionId);

        // Main Fetch Request
        const res = await apiFetch(`/transaction/${transactionId}`, {
            retry: true,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch transaction ${res.status}`);
        }

        const transaction: Transaction = await res.json();

        return transaction;
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.applicantForm.root}?${query}`);
    }
};

// POST: Transaction Creation Method
export const createTransaction = async ({ request }: ActionFunctionArgs) => {
    // URL Mapper
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    try {
        const formData = await request.formData();

        const submitAction = formData.get("action");

        // Remove action before passing FormData to Zod
        // This is for save and add button
        formData.delete("action");

        // ZOD Schema Checking
        const result = TransactionFormCreateSchema.safeParse(formData);
        if (!result.success) {
            console.error(result.error.flatten().fieldErrors);

            throw new Error("Invalid user data");
        }

        const transaction = result.data;

        // Main Fetch Request
        const res = await apiFetch("/transaction", {
            retry: true,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(transaction),
        });

        if (!res.ok) {
            throw new Error(`Failed to create transaction ${res.status} ${res.json()}`);
        }

        if (submitAction === "save-and-add") {
            return {
                success: true,
                action: "save-and-add",
            };
        }

        // Returns to root directory + queries
        return redirect(`${ROUTES.applicantForm.root}?${query}`);
    } catch (err) {
        console.error(err);

        // Returns to root directory + queries
        return redirect(`${ROUTES.applicantForm.root}?${query}`);
    }
};

// DELETE: Transaction Deletion Method
export const deleteTransaction =
    (root: transactionRootPage) =>
    async ({ request }: ActionFunctionArgs) => {
        // URL Mapper
        const url = new URL(request.url);
        const query = url.searchParams.toString();
        const nextPage = root === "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

        try {
            const formData = await request.formData();

            // ZOD Schema Checking
            const result = TransactionFormDeleteSchema.safeParse(formData);
            if (!result.success) {
                console.error(result.error.flatten().fieldErrors);

                throw new Error("Invalid user data");
            }

            const txCode = result.data.txCode;

            // Main Fetch Request
            const res = await apiFetch(`/transaction/${txCode}`, {
                retry: true,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to delete transaction ${res.status} ${res.json()}`);
            }

            // Returns to root directory + queries
            return redirect(`${nextPage}?${query}`);
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirect(`${nextPage}?${query}`);
        }
    };

// PATCH: Transaction Update Method
export const updateTransaction =
    (root: transactionRootPage) =>
    async ({ params, request }: ActionFunctionArgs) => {
        // URL Mapper
        const url = new URL(request.url);
        const query = url.searchParams.toString();
        const nextPage = root === "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

        try {
            const transactionId = decode(params.transactionId);
            const formData = await request.formData();

            // ZOD Schema Checking
            const result = TransactionFormUpdateSchema.safeParse(formData);
            if (!result.success) {
                console.error(z.treeifyError(result.error));

                throw new Error("Invalid user data");
            }

            // Main Fetch Request
            const res = await apiFetch(`/transaction/${transactionId}`, {
                retry: true,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(result.data),
            });

            if (!res.ok) {
                const error = (await res.json()).error;
                throw new Error(`Failed to update transaction ${res.status} => ${error}`);
            }

            // Returns to root directory + queries
            return redirect(`${nextPage}?${query}`);
        } catch (err) {
            console.error(err);

            // Returns to root directory + queries
            return redirect(`${nextPage}?${query}`);
        }
    };

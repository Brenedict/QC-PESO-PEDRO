import { redirect, type ActionFunctionArgs } from "react-router";
import { PopupViewEditTransaction, PopupDeleteTransaction } from "../components/popups/TransactionsPopups";
import { PopupTimeIn, PopupLogout, PopupEndshiftSummary, PopupSessionEnd } from "../components/popups/ShiftPopups";
import { ROUTES, type transactionRootPage } from "../hooks/reroute";
import { logoutService } from "../api/authService";
import z from "zod";
import { deleteTransaction, getTransactionById, updateTransaction } from "../api/transactionService";

export const testActionFn =
    (schema: z.ZodType) =>
    async ({ request }: ActionFunctionArgs) => {
        const formData = await request.formData();
        const validationResult = schema.safeParse(formData);

        if (!validationResult.success) {
            return { errors: z.prettifyError(validationResult.error) };
        }
        return redirect("..");
    };

// Transaction edit/delete routes shared across sections
export const transactionsEditAndDelete = (root: transactionRootPage) => [
    {
        path: ":transactionId/edit",
        element: <PopupViewEditTransaction root={root} />, // JSX preserved
        action: updateTransaction(root),
        loader: getTransactionById,
    },

    {
        path: ":transactionId/delete",
        element: <PopupDeleteTransaction root={root} />,
        action: deleteTransaction(root),
    },
];

// Common shift popups used throughout the app
export const shiftPopups = (root: string) => [
    {
        path: "time-in",
        element: <PopupTimeIn root={root} />,
        action: async () => redirect(root),
    },
    {
        path: "end-shift-confirmation",
        element: <PopupEndshiftSummary root={root} />,
        action: async () => redirect("/auth"),
    },
    {
        path: "session-end",
        element: <PopupSessionEnd root={root} />,
    },
    {
        path: "log-out",
        element: <PopupLogout root={root} />,
        action: async () => {
            const success = await logoutService();
            if (success) {
                return redirect(ROUTES.auth.root);
            }
        },
    },
];

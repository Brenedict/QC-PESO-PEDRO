import { redirect, type ActionFunctionArgs } from "react-router";
import { TransactionSchema } from "../validators/transactions";
import { editTransaction, deleteTransaction } from "../api/transactions";
import { PopupViewEditTransaction, PopupDeleteTransaction } from "../components/popups/TransactionsPopups";
import { PopupTimeIn, PopupLogout, PopupEndshiftSummary, PopupSessionEnd } from "../components/popups/ShiftPopups";
import { UserSchema } from "../validators/users";
import { ROUTES, type transactionRootPage } from "../hooks/reroute";
import { logoutService } from "../api/authService";

export const testActionFn =
    (schema: typeof TransactionSchema | typeof UserSchema) =>
    async ({ request }: ActionFunctionArgs) => {
        const formData = await request.formData();
        const data = schema.parse(formData);
        console.log(data);
        return redirect("..");
    };

// Transaction edit/delete routes shared across sections
export const transactionsEditAndDelete = (root: transactionRootPage) => [
    {
        path: ":transactionId/edit",
        element: <PopupViewEditTransaction root={root} />, // JSX preserved
        action: async ({ request }: ActionFunctionArgs) => {
            try {
                const formData = await request.formData();
                const data = TransactionSchema.parse(formData);
                await editTransaction(data);
                return redirect("..");
            } catch (err) {
                console.error(err);
                return redirect("..");
            }
        },
    },
    {
        path: ":transactionId/delete",
        element: <PopupDeleteTransaction root={root} />,
        action: async ({ request }: ActionFunctionArgs) => {
            try {
                const formData = await request.formData();
                const data = TransactionSchema.parse(formData);
                await deleteTransaction(data);
                return redirect("..");
            } catch (err) {
                console.error(err);
                return redirect("..");
            }
        },
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

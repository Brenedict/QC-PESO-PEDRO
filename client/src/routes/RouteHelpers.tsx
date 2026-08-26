// General Imports
import { redirect } from "react-router";

// Components
import { PopupViewEditTransaction, PopupDeleteTransaction } from "../components/popups/TransactionsPopups";
import {
    PopupTimeIn,
    PopupLogout,
    PopupEndshiftSummary,
    PopupSessionEnd,
    PopupUnfinishedShift,
} from "../components/popups/ShiftPopups";

// API Services
import { logoutAction } from "../api/authService";
import { deleteTransaction, getTransactionById, updateTransaction } from "../api/transactionService";

// Custom Hooks
import { type transactionRootPage } from "../hooks/useNavigateDefault";
import { getShiftDetailsOverview, patchEndShift, timeInShift } from "../api/shiftService";

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
        element: <PopupTimeIn />,
        action: timeInShift,
    },
    {
        path: "end-shift-confirmation",
        element: <PopupEndshiftSummary root={root} />,
        action: patchEndShift(),
        loader: getShiftDetailsOverview({ overview: ["total", "pending"] }, true),
    },
    {
        path: "unfinished-shift",
        element: <PopupUnfinishedShift />,
        action: patchEndShift(root),
        loader: getShiftDetailsOverview({ overview: ["total", "pending"] }, true),
    },
    {
        path: "session-end",
        element: <PopupSessionEnd root={root} />,
    },
    {
        path: "log-out",
        element: <PopupLogout root={root} />,
        action: logoutAction,
    },
];

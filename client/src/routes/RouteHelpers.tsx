// General Imports
import { redirect, type LoaderFunctionArgs } from "react-router";

// Components
import { PopupViewEditTransaction, PopupDeleteTransaction } from "../components/popups/TransactionsPopups";
import {
    PopupTimeIn,
    PopupLogout,
    PopupEndshiftSummary,
    PopupSessionEnd,
    PopupUnfinishedShift,
    PopupReviseShift,
} from "../components/popups/ShiftPopups";

// API Services
import { logoutAction } from "../api/authService";
import { deleteTransaction, getTransactionById, updateTransaction } from "../api/transactionService";

// Custom Hooks
import { type transactionRootPage } from "../hooks/useNavigateDefault";
import { getShiftDetailsOverview, patchEndShift, patchReviseShift, timeInShift } from "../api/shiftService";
import InMemoryStore from "../api/inMemoryStore";
import { redirectWithQuery } from "../api/actionService";
import { buildDayRangeParam } from "../api/dateService";

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
        loader: async ({ request }: LoaderFunctionArgs) => {
            const user = InMemoryStore.getUser();
            if (user?.shiftLog) {
                // validate if theres currently a shift log
                // if so, close the popup (so user cant manually open it by changing url)
                return redirectWithQuery(request, root);
            }
        },
    },
    {
        path: "end-shift-confirmation",
        element: <PopupEndshiftSummary root={root} />,
        action: patchEndShift(root),
        loader: getShiftDetailsOverview({ overview: ["total", "pending"] }, true),
    },
    {
        path: "unfinished-shift",
        element: <PopupUnfinishedShift />,
        action: patchEndShift(root),
        loader: async ({ request, params }: LoaderFunctionArgs) => {
            const user = InMemoryStore.getUser();
            const { startDate } = buildDayRangeParam(new Date());
            const timeIn = user?.shiftLog?.timeIn ? new Date(user.shiftLog.timeIn) : undefined;
            if (timeIn && timeIn >= new Date(startDate)) {
                // validate if current shift is not today
                // if so, close the popup (so user cant manually open it by changing url)
                return redirectWithQuery(request, root);
            }

            const args = { request, params } as LoaderFunctionArgs;
            return getShiftDetailsOverview({ overview: ["total", "pending"] }, true)(args);
        },
    },
    {
        path: "revision",
        element: <PopupReviseShift />,
        action: patchReviseShift(root),
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

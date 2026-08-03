// General Imports
import { redirect, type ActionFunctionArgs, type RouteObject } from "react-router";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Utils
import { decode } from "./utils/hashids";

// Hooks
import { ROUTES, useNavigateDefault } from "./hooks/reroute";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import { Overview } from "./pages/Overview";
import ProfilePage from "./pages/ProfilePage";
import TransactionsInputPage from "./pages/TransactionsInputPage";
import TransactionHistory from "./pages/TransactionHistory";
import EndShiftVerification from "./pages/EndShiftVerification";
import LoginMonitoring from "./pages/LoginMonitoring";

// Components
import { PopupViewEditTransaction, PopupDeleteTransaction } from "./components/popups/TransactionsPopups";
import { PopupTimeIn, PopupLogout, PopupEndshiftSummary } from "./components/popups/ShiftPopups";

// Test Data
import { transactions } from "./data/transactions";
import { shiftRecords } from "./data/shiftRecords";
import { employeeSessions } from "./data/employeeSessions";
import SystemAuditLogs from "./pages/SystemAuditLogs";
import { auditLogData } from "./data/auditLogs";
import UserManagement from "./pages/UserManagement";
import { usersData } from "./data/users";
import type { TopBarContextValue } from "./context/TopbarContext";
import Reports from "./pages/Reports";

//Temporary lang (naaisip ko nakacontext to once na may backend na tayo)
const userContext: TopBarContextValue = {
    status: "online",
    userFullName: "Richard Yap",
    hasNotif: false,
    roleType: "admin",
    onSearchChange: () => {},
    onNotifClick: () => {},
};

const TransactionSchema = zfd.formData({
    id: zfd.text(z.string().optional().transform(decode)),
    name: zfd.text(z.string().optional()),
    date: zfd.text(z.string().optional()),
    time: zfd.text(z.string().optional()),
    transactionType: zfd.text(z.string().optional()),
    gender: zfd.text(z.string().optional()),
    transactionOutcome: zfd.text(z.string().optional()),
    firstTimeJobSeeker: zfd.checkbox().default(false),
    personsWithDisability: zfd.checkbox().default(false),
    seniorCitizen: zfd.checkbox().default(false),
    youngWorker: zfd.checkbox().default(false),
    student: zfd.checkbox().default(false),
    remarks: zfd.text(z.string().optional()),
});

const transactionsEditAndDelete = [
    {
        path: ":transactionId/edit",
        element: <PopupViewEditTransaction />,
        action: async ({ request, params }: ActionFunctionArgs) => {
            const formData = await request.formData();
            const data = TransactionSchema.parse(formData);
            console.log(data);
            return redirect("..");
        },
    },
    {
        path: ":transactionId/delete",
        element: <PopupDeleteTransaction />,
        action: async ({ request, params }: ActionFunctionArgs) => {
            const formData = await request.formData();
            return redirect("..");
        },
    },
];

const routes: RouteObject[] = [
    {
        path: "/auth",
        element: <LoginPage onSubmit={() => {}} />,
    },

    {
        path: "/",
        element: <DashboardLayout {...userContext} />,
        children: [
            {
                index: true,
                element: <Overview pending={5} approved={18} revision={2} role={userContext.roleType} />,
            },
            {
                path: "time-in",
                element: <PopupTimeIn />,
                action: async () => {
                    return redirect(ROUTES.dashboard.root);
                },
            },
            {
                path: "end-shift-confirmation",
                element: <PopupEndshiftSummary />,
                action: async () => {
                    return redirect("/auth");
                },
            },
            {
                path: "log-out",
                element: <PopupLogout />,
                action: async () => {
                    return redirect("/auth");
                },
            },
            {
                path: "settings",
                element: <ProfilePage roleType={userContext.roleType} userFullName={userContext.userFullName} />,
            },
            {
                path: "end-shift",
                element: <EndShiftVerification shiftData={shiftRecords} />,
            },
            {
                path: "history",
                element: (
                    <TransactionHistory
                        handleFilterSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                            e.preventDefault();
                        }}
                        transactions={transactions}
                    />
                ),
                children: transactionsEditAndDelete,
            },
            {
                path: "monitoring",
                element: (
                    <LoginMonitoring
                        currentlyLogged={12}
                        totalLogins={18}
                        totalLogouts={6}
                        sessionDuration={"8h 12m"}
                        handleFilterSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                            e.preventDefault();
                        }}
                        employeeSessions={employeeSessions}
                    />
                ),
            },
            {
                path: "applicant-form",
                element: <TransactionsInputPage onSubmit={() => {}} />,
                children: transactionsEditAndDelete,
            },
            {
                path: "audit-logs",
                element: <SystemAuditLogs logsData={auditLogData} />,
            },
            {
                path: "user-management",
                element: <UserManagement users={usersData} />,
            },
            {
                path: "reports",
                element: <Reports />,
            },

            {
                path: "settings",
                element: <ProfilePage roleType={userContext.roleType} userFullName={userContext.userFullName} />,
            },
        ],
    },
];

export default routes;

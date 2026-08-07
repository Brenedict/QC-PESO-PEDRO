// General Imports
import { redirect, type ActionFunctionArgs, type RouteObject } from "react-router";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Utils
import { decode } from "./utils/hashids";

// Hooks
import { ROUTES, useNavigateDefault, type transactionRootPage } from "./hooks/reroute";

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
import { PopupTimeIn, PopupLogout, PopupEndshiftSummary, PopupSessionEnd } from "./components/popups/ShiftPopups";

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
import {
    PopupAddUser,
    PopupDisableUser,
    PopupEditUser,
    PopupResetUser,
    PopupUserPriveleges,
} from "./components/popups/UserPopups";
import { PopupReportPreview } from "./components/popups/ReportPopups";
import { PopupViewHistory } from "./components/popups/MonitoringPopups";
import { ContextAnalysis } from "./pages/ContextAnalysis";

//Temporary lang (naaisip ko nakacontext to once na may backend na tayo)
const userContext: TopBarContextValue = {
    status: "online",
    userFullName: "Kenneth Pabillo",
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

const UserSchema = zfd.formData({
    id: zfd.text(z.string().optional().transform(decode)),
    fullName: zfd.text(z.string().optional()),
    userName: zfd.text(z.string().optional()),
    role: zfd.text(z.string().optional()),
    status: zfd.text(z.string().optional()),
    position: zfd.text(z.string().optional()),
    assignedOffice: zfd.text(z.string().optional()),
    password: zfd.text(z.string().optional()),
});

// Helper function
type SchemaType = typeof TransactionSchema | typeof UserSchema;
const testActionFn =
    (schema: SchemaType) =>
    async ({ request }: ActionFunctionArgs) => {
        const formData = await request.formData();
        const data = schema.parse(formData);
        console.log(data);
        return redirect("..");
    };

const transactionsEditAndDelete = (root: transactionRootPage) => [
    {
        path: ":transactionId/edit",
        element: <PopupViewEditTransaction root={root} />,
        action: testActionFn(TransactionSchema),
    },
    {
        path: ":transactionId/delete",
        element: <PopupDeleteTransaction root={root} />,
        action: testActionFn(TransactionSchema),
    },
];

const shiftPopups = (root: string) => [
    {
        path: "time-in",
        element: <PopupTimeIn root={root} />,
        action: async () => {
            return redirect(root);
        },
    },
    {
        path: "end-shift-confirmation",
        element: <PopupEndshiftSummary root={root} />,
        action: async () => {
            return redirect("/auth");
        },
    },
    {
        path: "session-end",
        element: <PopupSessionEnd root={root} />,
    },
    {
        path: "log-out",
        element: <PopupLogout root={root} />,
        action: async () => {
            return redirect("/auth");
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
                path: "",
                element: <Overview pending={5} approved={18} revision={2} role={userContext.roleType} />,
                children: [...shiftPopups(ROUTES.dashboard.root)],
            },
            {
                path: "profile",
                element: <ProfilePage roleType={userContext.roleType} userFullName={userContext.userFullName} />,
                children: [...shiftPopups(ROUTES.profile.root)],
            },
            {
                path: "end-shift",
                element: <EndShiftVerification shiftData={shiftRecords} />,
                children: [...shiftPopups(ROUTES.endshift.root)],
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
                children: [...transactionsEditAndDelete("history"), ...shiftPopups(ROUTES.history.root)],
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
                children: [
                    {
                        path: ":shiftId/view-history",
                        element: <PopupViewHistory />,
                    },
                    ...shiftPopups(ROUTES.monitoring.root),
                ],
            },
            {
                path: "applicant-form",
                element: <TransactionsInputPage onSubmit={() => {}} />,
                children: [...transactionsEditAndDelete("entry"), ...shiftPopups(ROUTES.applicantForm.root)],
            },
            {
                path: "audit-logs",
                element: <SystemAuditLogs logsData={auditLogData} />,
                children: [...shiftPopups(ROUTES.auditLogs.root)],
            },
            {
                path: "user-management",
                element: <UserManagement users={usersData} />,
                children: [
                    {
                        path: "create",
                        element: <PopupAddUser />,
                        action: testActionFn(UserSchema),
                    },
                    {
                        path: ":userId/edit",
                        element: <PopupEditUser />,
                        action: testActionFn(UserSchema),
                    },
                    {
                        path: ":userId/disable",
                        element: <PopupDisableUser />,
                        action: testActionFn(UserSchema),
                    },
                    {
                        path: ":userId/promote",
                        element: <PopupUserPriveleges privilegeType="promote" />,
                        action: testActionFn(UserSchema),
                    },
                    {
                        path: ":userId/demote",
                        element: <PopupUserPriveleges privilegeType="demote" />,
                        action: testActionFn(UserSchema),
                    },
                    {
                        path: ":userId/reset",
                        element: <PopupResetUser />,
                        action: testActionFn(UserSchema),
                    },
                    ...shiftPopups(ROUTES.userManagement.root),
                ],
            },
            {
                path: "reports",
                element: <Reports />,
                children: [
                    { path: "daily", element: <PopupReportPreview type={"daily"} /> },
                    { path: "weekly", element: <PopupReportPreview type={"weekly"} /> },
                    { path: "monthly", element: <PopupReportPreview type={"monthly"} /> },
                    { path: "overall", element: <PopupReportPreview type={"overall"} /> },
                     ...shiftPopups(ROUTES.reports.root)
                ],
            },
            {
                path: "context-analysis",
                element: <ContextAnalysis />,
                children: [...shiftPopups(ROUTES.contextAnalysis.root)],
            },
        ],
    },
];

export default routes;

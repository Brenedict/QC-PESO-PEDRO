// General Imports
import { redirect, type ActionFunctionArgs, type RouteObject } from "react-router";

// Schema
import { TransactionSchema } from "../../../shared/schema/transactions";
import { UserSchema } from "../../../shared/schema/users";

// Pages
import DashboardLayout from "../pages/DashboardLayout";
import { Overview } from "../pages/Overview";
import ProfilePage from "../pages/ProfilePage";
import TransactionsInputPage from "../pages/TransactionsInputPage";
import TransactionHistory from "../pages/TransactionHistory";
import EndShiftVerification from "../pages/EndShiftVerification";
import LoginMonitoring from "../pages/LoginMonitoring";
import { ContextAnalytics } from "../pages/ContextAnalytics";
import SystemAuditLogs from "../pages/SystemAuditLogs";
import UserManagement from "../pages/UserManagement";
import Reports from "../pages/Reports";

// Components
import {
    PopupAddUser,
    PopupDisableUser,
    PopupEditUser,
    PopupResetUser,
    PopupUserPriveleges,
} from "../components/popups/UserPopups";
import { PopupTransactionDetails } from "../components/popups/DashboardPopups";
import { PopupReportPreview } from "../components/popups/ReportPopups";
import { PopupViewHistory } from "../components/popups/MonitoringPopups";

// Test Data
import { transactions } from "../data/transactions";
import { shiftRecords } from "../data/shiftRecords";
import { employeeSessions } from "../data/employeeSessions";
import { auditLogData } from "../data/auditLogs";
import { usersData } from "../data/users";

// API
import { createTransaction } from "../api/transactions";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../pages/ProtectedRoute";

// Helper function
import { testActionFn, transactionsEditAndDelete, shiftPopups } from "./RouteHelpers";
import { userContext } from "../utils/userContext";
import { ROUTES } from "../hooks/reroute";
import { PopupEndShiftReview } from "../components/popups/EndShiftPopups";
import SystemErrorPage from "../pages/SystemErrorPage";

export const protectedRoutes: RouteObject[] = [
    {
        path: "/",
        element: (
            <AuthProvider>
                <ProtectedRoute />
            </AuthProvider>
        ),
        errorElement: <SystemErrorPage />,
        children: [
            {
                path: "",
                element: <DashboardLayout {...userContext} />,
                children: [
                    {
                        path: "",
                        element: <Overview pending={5} approved={18} revision={2} role={userContext.roleType} />,
                        children: [
                            {
                                path: "total",
                                element: (
                                    <PopupTransactionDetails
                                        label="Total Transactions"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            {
                                path: "walk-in",
                                element: (
                                    <PopupTransactionDetails
                                        label="Walk-in Transactions"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            {
                                path: "online",
                                element: (
                                    <PopupTransactionDetails
                                        label="Online Referrals"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            {
                                path: "in-house",
                                element: (
                                    <PopupTransactionDetails
                                        label="In-house Referrals"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            {
                                path: "work-immersion",
                                element: (
                                    <PopupTransactionDetails
                                        label="Work Immersion"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            {
                                path: "internship",
                                element: (
                                    <PopupTransactionDetails
                                        label="Internship Referrals"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            {
                                path: "inquiries",
                                element: (
                                    <PopupTransactionDetails
                                        label="Other Inquiries"
                                        today={48}
                                        thisWeek={215}
                                        thisMonth={840}
                                        history={shiftRecords}
                                    />
                                ),
                            },
                            ...shiftPopups(ROUTES.dashboard.root),
                        ],
                    },
                    {
                        path: "profile",
                        element: (
                            <ProfilePage roleType={userContext.roleType} userFullName={userContext.userFullName} />
                        ),
                        children: [...shiftPopups(ROUTES.profile.root)],
                    },
                    {
                        path: "end-shift",
                        element: <EndShiftVerification shiftData={shiftRecords} />,
                        children: [
                            {
                                path: ":shiftId/review",
                                element: <PopupEndShiftReview />,
                                action: async () => {
                                    return redirect(ROUTES.endshift.root);
                                },
                            },
                            ...shiftPopups(ROUTES.endshift.root),
                        ],
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
                        element: <TransactionsInputPage />,
                        children: [...transactionsEditAndDelete("entry"), ...shiftPopups(ROUTES.applicantForm.root)],
                        action: async ({ request }: ActionFunctionArgs) => {
                            try {
                                const formData = await request.formData();

                                const data = TransactionSchema.parse(formData);

                                await createTransaction(data);

                                return redirect(ROUTES.applicantForm.root);
                            } catch (err) {
                                console.error(err);

                                return redirect("..");
                            }
                        },
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
                            ...shiftPopups(ROUTES.reports.root),
                        ],
                    },
                    {
                        path: "context-analytics",
                        element: <ContextAnalytics />,
                        children: [...shiftPopups(ROUTES.contextAnalysis.root)],
                    },
                ],
            },
        ],
    },
];

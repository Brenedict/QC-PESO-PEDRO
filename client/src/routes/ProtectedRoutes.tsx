// General Imports
import { redirect, type ActionFunctionArgs, type RouteObject } from "react-router";
import { AccessLevel } from "@qcpesopedro/shared/prisma/accessLevel";

// Schema
import { TransactionSchema } from "@qcpesopedro/shared/schema//transactions";

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
import SystemErrorPage from "../pages/SystemErrorPage";

// Components
import {
    PopupAddUser,
    PopupManageUser,
    PopupEditUser,
    PopupResetUser,
    PopupUserPriveleges,
} from "../components/popups/UserPopups";
import { PopupTransactionDetails } from "../components/popups/DashboardPopups";
import { PopupReportPreview } from "../components/popups/ReportPopups";
import { PopupViewHistory } from "../components/popups/MonitoringPopups";
import { PopupEndShiftReview } from "../components/popups/EndShiftPopups";

// Test Data
import { transactions } from "../data/transactions";
import { shiftRecords } from "../data/shiftRecords";
import { employeeSessions } from "../data/employeeSessions";
import { auditLogData } from "../data/auditLogs";

// API
import { createTransaction } from "../api/transactions";
import { createUser, getUserById, getUsers, resetPassword, updateUser, manageUserAction } from "../api/userService";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../pages/ProtectedRoute";

// Helper function
import { transactionsEditAndDelete, shiftPopups } from "./RouteHelpers";
import { ROUTES } from "../hooks/reroute";
import { authLoader } from "../api/authService";

export const protectedRoutes: RouteObject[] = [
    {
        id: "protected",
        path: "/",
        element: (
            <AuthProvider>
                <ProtectedRoute />
            </AuthProvider>
        ),
        /* 
            Initial authentication on '/protected' happens here, and the user data is fetched. 
            If the user is not authenticated, they will be redirected to '/auth'.
        */
        loader: authLoader,
        errorElement: <SystemErrorPage />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Overview pending={5} approved={18} revision={2} />,
                        handle: { minAccessLevel: AccessLevel.FRONTLINE },
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
                        element: <ProfilePage />,
                        handle: { minAccessLevel: AccessLevel.FRONTLINE },
                        children: [...shiftPopups(ROUTES.profile.root)],
                    },
                    {
                        path: "end-shift",
                        element: <EndShiftVerification shiftData={shiftRecords} />,
                        handle: { minAccessLevel: AccessLevel.ADMIN },
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
                        handle: { minAccessLevel: AccessLevel.FRONTLINE },
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
                        handle: { minAccessLevel: AccessLevel.ADMIN },
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
                        handle: { minAccessLevel: AccessLevel.FRONTLINE },
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
                        handle: { minAccessLevel: AccessLevel.ADMIN },
                        children: [...shiftPopups(ROUTES.auditLogs.root)],
                    },
                    {
                        path: "user-management",
                        element: <UserManagement />,
                        handle: { minAccessLevel: AccessLevel.ADMIN },
                        loader: getUsers,
                        children: [
                            {
                                path: "create",
                                element: <PopupAddUser />,
                                action: createUser,
                            },
                            {
                                path: ":userId/edit",
                                element: <PopupEditUser />,
                                action: updateUser,
                                loader: getUserById,
                            },
                            {
                                path: ":userId/manage",
                                element: <PopupManageUser />,
                                action: manageUserAction,
                                loader: getUserById,
                            },
                            {
                                path: ":userId/promote",
                                element: <PopupUserPriveleges privilegeType="promote" />,
                                action: updateUser,
                                loader: getUserById,
                            },
                            {
                                path: ":userId/demote",
                                element: <PopupUserPriveleges privilegeType="demote" />,
                                action: updateUser,
                                loader: getUserById,
                            },
                            {
                                path: ":userId/reset",
                                element: <PopupResetUser />,
                                action: resetPassword,
                                loader: getUserById,
                            },
                            ...shiftPopups(ROUTES.userManagement.root),
                        ],
                    },
                    {
                        path: "reports",
                        element: <Reports />,
                        // Just added this for now, if not correct access level change it
                        handle: { minAccessLevel: AccessLevel.SUPERADMIN },
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
                        // Just added this for now, if not correct access level change it
                        handle: { minAccessLevel: AccessLevel.SUPERADMIN },
                        children: [...shiftPopups(ROUTES.contextAnalysis.root)],
                    },
                ],
            },
        ],
    },
];

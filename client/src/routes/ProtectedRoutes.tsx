// General Imports
import { redirect, type ActionFunctionArgs, type RouteObject } from "react-router";

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
    PopupDisableUser,
    PopupEditUser,
    PopupResetUser,
    PopupUserPriveleges,
} from "../components/popups/UserPopups";
import { PopupTransactionDetails } from "../components/popups/DashboardPopups";
import { PopupReportPreview } from "../components/popups/ReportPopups";
import { PopupViewHistory } from "../components/popups/MonitoringPopups";
import { PopupEndShiftReview } from "../components/popups/EndShiftPopups";

// Test Data
import { shiftRecords } from "../data/shiftRecords";
import { employeeSessions } from "../data/employeeSessions";
import { auditLogData } from "../data/auditLogs";

// API
import { createUser, getUserById, getUsers, resetPassword, updateUser } from "../api/userService";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../pages/ProtectedRoute";

// Helper function
import { transactionsEditAndDelete, shiftPopups } from "./RouteHelpers";
import { ROUTES } from "../hooks/reroute";
import {
    createTransaction,
    getDetailsAnalytics,
    getOverviewAnalytics,
    getRecentTransactions,
    getTransactionReport,
    getTransactions,
    getTransactionSummary,
} from "../api/transactionService";

export const protectedRoutes: RouteObject[] = [
    {
        id: "protected",
        path: "/",
        element: (
            /* 
                Initial authentication on '/protected' happens here, and the user data is fetched. 
                If the user is not authenticated, they will be redirected to '/auth'.
            */
            <AuthProvider>
                <ProtectedRoute />
            </AuthProvider>
        ),
        errorElement: <SystemErrorPage />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Overview pending={5} approved={18} revision={2} />,
                        loader: async (args: ActionFunctionArgs) => {
                            const analytics = await getOverviewAnalytics(args);
                            const recent = await getRecentTransactions(args);
                            return { analytics, recent };
                        },
                        children: [
                            {
                                path: "total",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics(),
                            },
                            {
                                path: "walk-in",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ type: "WALK_IN_REFERRAL" }),
                            },
                            {
                                path: "online",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ type: "ONLINE_REFERRAL" }),
                            },
                            {
                                path: "in-house",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ type: "IN_HOUSE_RECRUITMENT" }),
                            },
                            {
                                path: "work-immersion",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ demographics: "WORK_IMMERSION_INTERNSHIP" }),
                            },
                            {
                                path: "job-seeker",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ demographics: "FIRST_TIME_JOB_SEEKER" }),
                            },
                            {
                                path: "pwd",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ demographics: "PERSONS_WITH_DISABILITY" }),
                            },
                            {
                                path: "senior",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ demographics: "SENIOR_CITIZEN" }),
                            },
                            {
                                path: "young-worker",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ demographics: "YOUNG_WORKER" }),
                            },
                            {
                                path: "success",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ outcome: "SUCCESS" }),
                            },
                            {
                                path: "pending",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ outcome: "PENDING" }),
                            },
                            {
                                path: "mismatch",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ outcome: "MISMATCH" }),
                            },
                            {
                                path: "none",
                                element: <PopupTransactionDetails />,
                                loader: getDetailsAnalytics({ outcome: "NONE" }),
                            },
                            // {
                            //     path: "internship",
                            //     element: (
                            //         <PopupTransactionDetails
                            //             label="Internship Referrals"
                            //             today={48}
                            //             thisWeek={215}
                            //             thisMonth={840}
                            //             history={shiftRecords}
                            //         />
                            //     ),
                            // },
                            // {
                            //     path: "inquiries",
                            //     element: (
                            //         <PopupTransactionDetails
                            //             label="Other Inquiries"
                            //             today={48}
                            //             thisWeek={215}
                            //             thisMonth={840}
                            //             history={shiftRecords}
                            //         />
                            //     ),
                            // },
                            ...shiftPopups(ROUTES.dashboard.root),
                        ],
                    },
                    {
                        path: "profile",
                        element: <ProfilePage />,
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
                            />
                        ),
                        children: [...transactionsEditAndDelete("history"), ...shiftPopups(ROUTES.history.root)],
                        loader: getTransactions(false),
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
                        loader: getTransactions(true),
                        action: createTransaction,
                    },
                    {
                        path: "audit-logs",
                        element: <SystemAuditLogs logsData={auditLogData} />,
                        children: [...shiftPopups(ROUTES.auditLogs.root)],
                    },
                    {
                        path: "user-management",
                        element: <UserManagement />,
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
                                path: ":userId/disable",
                                element: <PopupDisableUser />,
                                action: updateUser,
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
                        loader: getTransactionSummary,
                        children: [
                            {
                                path: "daily",
                                element: <PopupReportPreview type={"daily"} />,
                                loader: getTransactionReport("DAILY"),
                            },
                            {
                                path: "weekly",
                                element: <PopupReportPreview type={"weekly"} />,
                                loader: getTransactionReport("WEEKLY"),
                            },
                            {
                                path: "monthly",
                                element: <PopupReportPreview type={"monthly"} />,
                                loader: getTransactionReport("MONTHLY"),
                            },
                            {
                                path: "overall",
                                element: <PopupReportPreview type={"overall"} />,
                                loader: getTransactionReport("SUMMARY"),
                            },
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

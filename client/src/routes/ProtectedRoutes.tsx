// General Imports
import { redirect, type RouteObject } from "react-router";
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";

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
import { PopupEndShiftReview, PopupShiftViewTransactionDetails } from "../components/popups/EndShiftPopups";

// Test Data
import { shiftRecords } from "../data/shiftRecords";
import { employeeSessions } from "../data/employeeSessions";
import { auditLogData } from "../data/auditLogs";

// API
import { createUser, getUserById, getUsers, manageUserAction, resetPassword, updateUser } from "../api/userService";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../pages/ProtectedRoute";

// Helper function
import { transactionsEditAndDelete, shiftPopups } from "./RouteHelpers";
import { ROUTES } from "../hooks/reroute";
import {
    createTransaction,
    getDetailsAnalytics,
    getTransactionReport,
    getTransactions,
    getTransactionSummary,
} from "../api/transactionService";

import { primaryAuthLoader, requireAccess } from "../api/authService";
import { getAnalytics } from "../api/analyticsService";
import { getShiftDetailsOverview, getShifts, patchReviewShift } from "../api/shiftService";
import { todayRedirectLoader } from "../api/dateService";

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
            Initial authentication on '/protected' NOW happens here, and the user data is fetched. 
            If the user is not authenticated, they will be redirected to '/auth'.
        */
        loader: primaryAuthLoader,
        errorElement: <SystemErrorPage />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Overview pending={5} approved={18} revision={2} />,
                        loader: requireAccess(AccessLevel.FRONTLINE, getAnalytics),
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
                        loader: requireAccess(AccessLevel.FRONTLINE),
                    },
                    {
                        path: "end-shift",
                        element: <EndShiftVerification />,
                        loader: requireAccess(AccessLevel.ADMIN, todayRedirectLoader(getShifts)),
                        children: [
                            {
                                path: ":shiftId/review",
                                element: <PopupEndShiftReview />,
                                action: patchReviewShift,
                                loader: getShiftDetailsOverview(true),
                            },
                            {
                                path: ":shiftId/details",
                                element: <PopupShiftViewTransactionDetails />,
                                loader: getShiftDetailsOverview(false),
                            },
                            ...shiftPopups(ROUTES.endshift.root),
                        ],
                    },
                    {
                        path: "history",
                        element: <TransactionHistory />,
                        children: [...transactionsEditAndDelete("history"), ...shiftPopups(ROUTES.history.root)],
                        loader: requireAccess(AccessLevel.FRONTLINE, getTransactions(false)),
                    },
                    {
                        path: "monitoring",
                        element: (
                            <LoginMonitoring
                                currentlyLogged={12}
                                totalLogins={18}
                                totalLogouts={6}
                                sessionDuration={"8h 12m"}
                                employeeSessions={employeeSessions}
                            />
                        ),
                        loader: requireAccess(AccessLevel.ADMIN),
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
                        loader: requireAccess(AccessLevel.FRONTLINE, getTransactions(true)),
                        action: createTransaction,
                    },
                    {
                        path: "audit-logs",
                        element: <SystemAuditLogs logsData={auditLogData} />,
                        loader: requireAccess(AccessLevel.ADMIN),
                        children: [...shiftPopups(ROUTES.auditLogs.root)],
                    },
                    {
                        path: "user-management",
                        element: <UserManagement />,
                        loader: requireAccess(AccessLevel.ADMIN, getUsers),
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
                        loader: requireAccess(AccessLevel.SUPERADMIN, getTransactionSummary),
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
                        // Just added this for now, if not correct access level change it
                        loader: requireAccess(AccessLevel.SUPERADMIN),
                        children: [...shiftPopups(ROUTES.contextAnalysis.root)],
                    },
                ],
            },
        ],
    },
];

import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import { Overview } from "./pages/Overview";
import ProfilePage from "./pages/ProfilePage";
import TransactionsInputPage from "./pages/TransactionsInputPage";
import TransactionHistory from "./pages/TransactionHistory";
import EndShiftVerification from "./pages/EndShiftVerification";
import { transactions } from "./data/transactions";
import { shiftRecords } from "./data/shiftRecords";
import LoginMonitoring from "./pages/LoginMonitoring";
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

const routes = [
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
                path: "end-shift",
                element: <EndShiftVerification shiftData={shiftRecords} />,
            },
            {
                path: "history",
                element: (
                    <TransactionHistory
                        onFilterSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                            e.preventDefault();
                        }}
                        transactions={transactions}
                    />
                ),
            },
            {
                path: "monitoring",
                element: (
                    <LoginMonitoring
                        currentlyLogged={12}
                        totalLogins={18}
                        totalLogouts={6}
                        sessionDuration={"8h 12m"}
                        onFilterSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                            e.preventDefault();
                        }}
                        employeeSessions={employeeSessions}
                    />
                ),
            },
            {
                path: "applicant-form",
                element: <TransactionsInputPage onSubmit={() => {}} />,
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

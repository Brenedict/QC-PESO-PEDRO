import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import { Overview } from "./components/Overview";
import ProfilePage from "./pages/ProfilePage";
import TransactionHistory from "./pages/TransactionHistory";
import { transactions } from "./data/transactions";
import LoginMonitoring from "./pages/LoginMonitoring";
import { employeeSessions } from "./data/employeeSessions";

const routes = [
    {
        path: "/auth",
        element: <LoginPage onSubmit={() => {}} />,
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <Overview />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "loginTest",
                element: <LoginPage onSubmit={() => {}} />,
            },
            {
                path: "history",
                element: <TransactionHistory onFilterSubmit={() => {}} transactions={transactions} />,
            },
            {
                path: "monitoring",
                element: (
                    <LoginMonitoring
                        currentlyLogged={12}
                        totalLogins={18}
                        totalLogouts={6}
                        sessionDuration={"8h 12m"}
                        onFilterSubmit={() => {}}
                        employeeSessions={employeeSessions}
                    />
                ),
            },
        ],
    },
];

export default routes;

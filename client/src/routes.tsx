import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import TransactionHistory from "./pages/TransactionHistory";
import { transactions } from "./data/transactions";
import LoginMonitoring from "./pages/LoginMonitoring";

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
                element: <LoginMonitoring />,
            },
        ],
    },
];

export default routes;

import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import TransactionsInputPage from "./pages/TransactionsInputPage";
import TransactionHistory from "./pages/TransactionHistory";
import EndShiftVerification from "./pages/EndShiftVerification";
import { transactions } from "./data/transactions";
import { shiftRecords } from "./data/shiftRecords";
import LoginMonitoring from "./pages/LoginMonitoring";
import { employeeSessions } from "./data/employeeSessions";
import { BasicPopup } from "./pages/TransactionHistory";

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
                path: "end-shift",
                element: <EndShiftVerification shiftData={shiftRecords} />,
            },
            {
                path: "history",
                element: <TransactionHistory onFilterSubmit={() => {}} transactions={transactions} />,
                children: [
                    {
                        path: ":userId/edit",
                        element: <BasicPopup />,
                    },
                ],
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
            {
                path: "applicant-form",
                element: <TransactionsInputPage onSubmit={() => {}} />,
            },
        ],
    },
];

export default routes;

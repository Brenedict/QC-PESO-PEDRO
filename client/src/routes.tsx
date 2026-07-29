import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import TransactionsInputPage from "./pages/TransactionsInputPage";
import TransactionHistory from "./pages/TransactionHistory";
import EndShiftVerification from "./pages/EndShiftVerification";
import { transactions } from "./data/transactions";
<<<<<<< HEAD
import { shiftRecords } from "./data/shiftRecords"; 
import LoginMonitoring from "./pages/LoginMonitoring";
import { employeeSessions } from "./data/employeeSessions";


=======
>>>>>>> 7c66f6c (feat(transactions-input): created the initial transactions input page.)

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
                path: "loginTest",
                element: <LoginPage onSubmit={() => {}} />,
            },
            {
                path: "history",
                element: <TransactionHistory onFilterSubmit={() => {}} transactions={transactions} />,
            },
            {
<<<<<<< HEAD
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
=======
                path: "applicant-form",
                element: <TransactionsInputPage onSubmit={() => {}} />,
>>>>>>> 7c66f6c (feat(transactions-input): created the initial transactions input page.)
            },
        ],
    },
];

export default routes;

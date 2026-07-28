import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import TransactionHistory from "./pages/TransactionHistory";
import EndShiftVerification from "./pages/EndShiftVerification";
import { transactions } from "./data/transactions";
<<<<<<< HEAD
import { shiftRecords } from "./data/shiftRecords"; 
=======
import LoginMonitoring from "./pages/LoginMonitoring";
>>>>>>> 6284784f79279f976d585ea79548b54577804ceb

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
                path: "monitoring",
                element: <LoginMonitoring />,
            },
        ],
    },
];

export default routes;

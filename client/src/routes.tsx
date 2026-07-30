// General Imports
import { redirect, type ActionFunctionArgs } from "react-router";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Utils
import { decode } from "./utils/hashids";

// Hooks

import { ROUTES, useNavigateDefault } from "./hooks/reroute";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import TransactionsInputPage from "./pages/TransactionsInputPage";
import TransactionHistory from "./pages/TransactionHistory";
import EndShiftVerification from "./pages/EndShiftVerification";
import LoginMonitoring from "./pages/LoginMonitoring";

// Components
import { PopupViewEditTransaction } from "./components/popups/TransactionsPopups";

// Test Data
import { transactions } from "./data/transactions";
import { shiftRecords } from "./data/shiftRecords";
import { employeeSessions } from "./data/employeeSessions";

const TransactionSchema = zfd.formData({
    id: zfd.text(z.string().optional().transform(decode)),
    name: zfd.text(z.string().optional()),
    date: zfd.text(z.string().optional()),
    time: zfd.text(z.string().optional()),
    transactionType: zfd.text(z.string().optional()),
    gender: zfd.text(z.string().optional()),
    transactionOutcome: zfd.text(z.string().optional()),
    firstTimeJobSeeker: zfd.checkbox().default(false),
    personsWithDisability: zfd.checkbox().default(false),
    seniorCitizen: zfd.checkbox().default(false),
    youngWorker: zfd.checkbox().default(false),
    student: zfd.checkbox().default(false),
    remarks: zfd.text(z.string().optional()),
});

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
                        path: ":transactionId/edit",
                        element: <PopupViewEditTransaction />,
                        action: async ({ request, params }: ActionFunctionArgs) => {
                            const formData = await request.formData();
                            const data = TransactionSchema.parse(formData);

                            return redirect("..");
                        },
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

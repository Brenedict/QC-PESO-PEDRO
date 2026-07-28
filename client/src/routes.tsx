import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";

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
                path: "login",
                element: <LoginPage onSubmit={() => {}} />,
            },
        ],
    },
];

export default routes;

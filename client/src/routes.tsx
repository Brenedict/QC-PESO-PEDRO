import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";

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
        ],
    },
];

export default routes;

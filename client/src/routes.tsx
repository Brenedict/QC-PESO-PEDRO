import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";

const routes = [
    {
        path: "/",
        element: <LoginPage onSubmit={() => {}} />,
    },
    {
        path: "/profile",
        element: <MyProfile />,
    },
];

export default routes;

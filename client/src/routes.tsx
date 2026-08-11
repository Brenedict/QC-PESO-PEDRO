import type { RouteObject } from "react-router";

// Routes split
import { authRoutes } from "./routes/AuthRoutes";
import { protectedRoutes } from "./routes/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";

const routes: RouteObject[] = [
    ...authRoutes,
    ...protectedRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

// Export combined routes
export default routes;

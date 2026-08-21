// General Imports
import type { RouteObject } from "react-router";

// Routes split
import { authRoutes } from "./routes/AuthRoutes";
import { protectedRoutes } from "./routes/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";

const routes: RouteObject[] = [
    // Handles Login and JWT Verification
    ...authRoutes,

    // Contains all routes after successful JWT Verification
    ...protectedRoutes,

    // Error Page handling
    {
        path: "*",
        element: <NotFoundPage />,
    },
];

// Export combined routes
export default routes;

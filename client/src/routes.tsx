// General Imports
import { Outlet, useNavigation, type RouteObject } from "react-router";

// Routes split
import { authRoutes } from "./routes/AuthRoutes";
import { protectedRoutes } from "./routes/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";
import { beginLoading, endLoading, LoadingProvider } from "./context/LoadingContext";
import { useEffect, useRef } from "react";

function LoaderWrapper() {
    const navigation = useNavigation();
    const isNavigating = navigation.state !== "idle";
    const wasNavigating = useRef(false);

    useEffect(() => {
        if (isNavigating && !wasNavigating.current) {
            wasNavigating.current = true;
            beginLoading();
        } else if (!isNavigating && wasNavigating.current) {
            wasNavigating.current = false;
            endLoading();
        }
    }, [isNavigating]);

    return (
        <LoadingProvider>
            <Outlet />
        </LoadingProvider>
    );
}

const routes: RouteObject[] = [
    {
        path: "",
        element: <LoaderWrapper />,
        children: [
            // Handles Login and JWT Verification
            ...authRoutes,

            // Contains all routes after successful JWT Verification
            ...protectedRoutes,

            // Error Page handling
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
];

// Export combined routes
export default routes;

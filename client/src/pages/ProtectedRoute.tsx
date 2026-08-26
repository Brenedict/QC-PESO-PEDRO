// General Imports
import { Outlet, useRouteLoaderData } from "react-router";

// API Services
import type { primaryAuthLoader } from "../api/authService";

// Contexts
import { UserGlobalProvider, type UserGlobalContextValue } from "../context/UserGlobalContext";

export function ProtectedRoute() {
    const data = useRouteLoaderData<typeof primaryAuthLoader>("protected");
    const user = data?.user;

    if (!user) {
        throw new Error("User not found");
    }

    // Global context gathered from `/user/me`
    const userGlobalContext: UserGlobalContextValue = {
        id: user.id,
        email: user.email,
        shift: user.shift,
        status: user.status ?? "ONLINE",
        hasNotif: false,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        onSearchChange: () => {},
        onNotifClick: () => {},
    };
    return (
        <UserGlobalProvider value={userGlobalContext}>
            <Outlet />
        </UserGlobalProvider>
    );
}

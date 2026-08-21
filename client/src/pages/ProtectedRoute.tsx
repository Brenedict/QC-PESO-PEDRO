// General Imports
import { Navigate, Outlet, useMatches, useRouteLoaderData } from "react-router";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";

// Custom Hooks
import { type RouteHandle } from "../hooks/useAccessLevel";

// API Services
import type { primaryAuthLoader } from "../api/authService";

// Contexts
import { UserGlobalProvider, type UserGlobalContextValue } from "../context/UserGlobalContext";

export function ProtectedRoute() {
    const data = useRouteLoaderData<typeof primaryAuthLoader>("protected");
    const user = data?.user;

    if (!data?.user) {
        return null;
    }

    // Global context gathered from `/user/me`
    const userGlobalContext: UserGlobalContextValue = {
        id: user.id,
        status: user.status ?? "ONLINE",
        hasNotif: false,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        onSearchChange: () => {},
        onNotifClick: () => {},
    };

    const matches = useMatches();

    const route = [...matches]
        .reverse()
        .find((match) => (match.handle as RouteHandle | undefined)?.minAccessLevel !== undefined);

    const minAccessLevel = (route?.handle as RouteHandle | undefined)?.minAccessLevel;

    // Compares minAccessLevel and compares with current user role.
    const userLevel = Number(AccessLevel[user.role]) ?? 0;

    console.log({
        role: user.role,
        roleLevel: AccessLevel[user.role],
        userLevel,
        minAccessLevel,
    });

    if (minAccessLevel !== undefined && userLevel < minAccessLevel) {
        return <Navigate to="/403" />;
    }

    return (
        <UserGlobalProvider value={userGlobalContext}>
            <Outlet />
        </UserGlobalProvider>
    );
}

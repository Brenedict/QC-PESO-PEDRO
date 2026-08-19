import { Navigate, Outlet, useMatches, useRouteLoaderData } from "react-router";
import { UserGlobalProvider, type UserGlobalContextValue } from "../context/UserGlobalContext";
import { type RouteHandle } from "../hooks/useAccessLevel";
import { ROLE_TO_LEVEL } from "@qcpesopedro/shared/prisma/accessLevel";
import type { authLoader } from "../api/authService";

export function ProtectedRoute() {
    const data = useRouteLoaderData<typeof authLoader>("protected");
    const user = data?.user;

    if (!data?.user) {
        return null;
    }

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

    const userLevel = ROLE_TO_LEVEL[user.role] ?? 0;

    console.log("User Level:", userLevel);
    console.log("Min Access Level:", minAccessLevel);

    if (minAccessLevel !== undefined && userLevel < minAccessLevel) {
        return <Navigate to="/403" />;
    }

    return (
        <UserGlobalProvider value={userGlobalContext}>
            <Outlet />
        </UserGlobalProvider>
    );
}

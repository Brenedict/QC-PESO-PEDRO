// General Imports
import { useSyncExternalStore } from "react";
import { Outlet, useRouteLoaderData } from "react-router";

// API Services
import type { primaryAuthLoader } from "../api/authService";
import InMemoryStore from "../api/inMemoryStore";

// Contexts
import { UserGlobalProvider, type UserGlobalContextValue } from "../context/UserGlobalContext";

export function ProtectedRoute() {
    const data = useRouteLoaderData<typeof primaryAuthLoader>("protected");
    const fallbackUser = data?.user;

    const storeUser = useSyncExternalStore(InMemoryStore.subscribe, InMemoryStore.getUser);
    const user = storeUser ?? fallbackUser;

    if (!user) {
        throw new Error("User not found");
    }

    // Global context gathered from `/user/me`
    const userGlobalContext: UserGlobalContextValue = {
        id: user.id,
        email: user.email,
        shift: user.shift,
        status: user.status ?? "ONLINE",
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        onSearchChange: () => {},
    };
    return (
        <UserGlobalProvider value={userGlobalContext}>
            <Outlet />
        </UserGlobalProvider>
    );
}

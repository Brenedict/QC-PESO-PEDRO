// General Imports
import { Outlet, useRouteLoaderData } from "react-router";
import "../index.css";
import { type UserFormCreateType } from "@qcpesopedro/shared/schema/users";

// Components
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";

// Loader
import type { authLoader } from "../api/authService";

// Context
import type { TopBarContextValue } from "../context/TopbarContext";

function DashboardLayout() {
    const data = useRouteLoaderData<typeof authLoader>("protected");

    if (!data) {
        return null;
    }

    // Temporary Placement I think there are better ways to place this
    const user = data.user as UserFormCreateType;

    const topbarContext: TopBarContextValue = {
        status: user.status || "ONLINE",
        hasNotif: false,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "FRONTLINE",
        onSearchChange: () => {},
        onNotifClick: () => {},
    };

    return (
        <main className="w-screen h-screen overflow-hidden flex antialiased">
            <NavBar userType={user.role} />

            <section className="flex-1 flex flex-col min-w-0">
                <TopBar {...topbarContext} />

                <div className="p-8 bg-off-white grow overflow-y-auto overscroll-y-auto">
                    <Outlet />
                </div>
            </section>
        </main>
    );
}

export default DashboardLayout;

// General Imports
import { Outlet } from "react-router";
import "../index.css";

// Components
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";

// Loader
import { useAuth } from "../context/AuthContext";

// Context
import { TopBarProvider } from "../context/TopbarContext";
import type { TopBarContextValue } from "../context/TopbarContext";

function DashboardLayout() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const topbarContext: TopBarContextValue = {
        id: user.id,
        status: user.status ?? "ONLINE",
        hasNotif: false,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        onSearchChange: () => {},
        onNotifClick: () => {},
    };

    return (
        <main className="w-screen h-screen overflow-hidden flex antialiased">
            <NavBar userType={user.role} />

            <section className="flex-1 flex flex-col min-w-0">
                <TopBarProvider value={topbarContext}>
                    <TopBar />
                    <div className="p-8 bg-off-white grow overflow-y-auto overscroll-y-auto">
                        <Outlet />
                    </div>
                </TopBarProvider>
            </section>
        </main>
    );
}

export default DashboardLayout;

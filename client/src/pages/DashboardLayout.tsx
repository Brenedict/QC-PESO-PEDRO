// General Imports
import { Outlet } from "react-router";
import "../index.css";

// Components
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";
import { useUserGlobal } from "../context/UserGlobalContext";

function DashboardLayout() {
    const { role } = useUserGlobal();

    return (
        <main className="w-screen h-screen overflow-hidden flex antialiased">
            <NavBar userType={role} />

            <section className="flex-1 flex flex-col min-w-0">
                <TopBar />
                <div className="p-8 bg-off-white grow overflow-y-auto overscroll-y-auto">
                    <Outlet />
                </div>
            </section>
        </main>
    );
}

export default DashboardLayout;

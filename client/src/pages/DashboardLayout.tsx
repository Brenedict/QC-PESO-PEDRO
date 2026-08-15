// General Imports
import { Outlet } from "react-router";
import "../index.css";

// Components
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";

// Context
import type { TopBarContextValue } from "../context/TopbarContext";

function DashboardLayout(props: TopBarContextValue) {
    return (
        <main className="w-screen h-screen overflow-hidden flex antialiased">
            <NavBar userType={props.roleType} />

            <section className="flex-1 flex flex-col min-w-0">
                <TopBar {...props} />

                <div className="p-8 bg-off-white grow overflow-y-auto overscroll-y-auto">
                    <Outlet />
                </div>
            </section>
        </main>
    );
}

export default DashboardLayout;

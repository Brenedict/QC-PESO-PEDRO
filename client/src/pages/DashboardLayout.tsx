import { Outlet } from "react-router";
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";
import type { TopBarContextValue } from "../context/TopbarContext";

import "../index.css";

function DashboardLayout(props: TopBarContextValue) {
    return (
        <main className="w-full min-h-screen flex antialiased">
            <NavBar userType={props.roleType} />

            <section className="flex-1">
                <TopBar {...props} />
                <main className="p-8 bg-off-white">
                    <Outlet />
                </main>
            </section>
        </main>
    );
}
export default DashboardLayout;

// General Imports
import { Outlet, Route, Routes } from "react-router";
import "../index.css";

// Components
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";

// Context
import type { TopBarContextValue } from "../context/TopbarContext";

function DashboardLayout(props: TopBarContextValue) {
    return (
        <>
            <main className="w-full min-h-screen flex antialiased">
                <NavBar userType={props.roleType} />

                <section className="flex-1 flex flex-col">
                    <TopBar {...props} />
                    <main className="p-8 bg-off-white grow">
                        <Outlet />
                    </main>
                </section>
            </main>
        </>
    );
}
export default DashboardLayout;

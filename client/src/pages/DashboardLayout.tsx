import { Outlet } from "react-router";
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";

function DashboardLayout() {
    return (
        <main className="w-full min-h-screen flex antialiased">
            <NavBar userType="frontline" />

            <section className="flex-1">
                <TopBar
                    status="online"
                    hasNotif={true}
                    userFullName={"Richard Yap"}
                    roleType="frontline"
                    onNotifClick={() => console.log()}
                    onSearchChange={() => console.log()}
                ></TopBar>
                <main className="p-8 bg-off-white">
                    <Outlet />
                </main>
            </section>
            <Outlet />
        </main>
    );
}
export default DashboardLayout;

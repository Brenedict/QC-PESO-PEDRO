import { Outlet } from "react-router";
import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";

function DashboardLayout() {
    return (
        <main className="w-full min-h-screen flex">
            <NavBar userType="frontline"></NavBar>
            <section className="w-full">
                <TopBar
                    status="online"
                    hasNotif={true}
                    userFullName={"Richard Yap"}
                    roleType="frontline"
                    onNotifClick={() => console.log()}
                    onSearchChange={() => console.log()}
                ></TopBar>
                <Outlet />
            </section>
        </main>
    );
}

export default DashboardLayout;

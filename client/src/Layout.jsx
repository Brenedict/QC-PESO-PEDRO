import { Outlet } from "react-router";
import App from "./App";

function Layout() {
    return (
        <>
            <App />
            <Outlet />
        </>
    );
}

export default Layout;
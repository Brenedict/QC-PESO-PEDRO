import type { ReactNode } from "react";
import { NavLink } from "react-router";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SensorOccupiedOutlinedIcon from "@mui/icons-material/SensorOccupiedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function NavProfile({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-3xl w-8 h-8 bg-primary-blue text-white text-small-description font-bold flex justify-center items-center">
            <div>{children}</div>
        </div>
    );
}

function NavHeader({ profileText, children }: { profileText: string; children: ReactNode }) {
    return (
        <div className="flex justify-start items-center gap-3 px-6 py-4">
            <NavProfile>{profileText}</NavProfile>
            <h1 className="text-white text-medium font-bold">{children}</h1>
        </div>
    );
}

// Used to set the title and content of NavLink
const linkTypeMap = {
    dashboard: { content: "Dashboard", icon: DashboardOutlinedIcon },
    transaction_entry: { content: "Transaction Entry", icon: SaveAsOutlinedIcon },
    transaction_history: { content: "Transaction History", icon: HistoryOutlinedIcon },
    end_shift_verification: { content: "End Shift Verification", icon: InventoryOutlinedIcon },
    login_monitoring: { content: "Login Monitoring", icon: OndemandVideoOutlinedIcon },
    context_analytics: { content: "Context Analytics", icon: PollOutlinedIcon },
    reports: { content: "Reports", icon: PieChartOutlineOutlinedIcon },
    audit_logs: { content: "Audit Logs", icon: AssignmentOutlinedIcon },
    user_management: { content: "User Management", icon: SensorOccupiedOutlinedIcon },
    settings: { content: "Settings", icon: SettingsOutlinedIcon },
    logout: { content: "Logout", icon: LogoutOutlinedIcon },
} as const;

// Use keyof typeof to get the keys as a union type
export type LinkType = keyof typeof linkTypeMap;

function NavButton({ linkType, to }: { linkType: LinkType; to: string }) {
    const { content, icon: LinkIcon } = linkTypeMap[linkType];

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-2.5 flex justify-start items-center gap-3 mb-1 text-white rounded-xl transition-colors ${isActive ? "bg-primary-blue hover:bg-blue-800" : "hover:bg-blue-900"}`
            }
        >
            <LinkIcon className="stroke-0 " fontSize="small" />
            <div className=" text-description font-medium ">{content}</div>
        </NavLink>
    );
}

function NavBodyFrontline() {
    return (
        <>
            <NavButton linkType="dashboard" to="/" />
            <NavButton linkType="transaction_entry" to="/transaction-entry" />
            <NavButton linkType="transaction_history" to="/transaction-history" />
            <NavButton linkType="settings" to="/settings" />
        </>
    );
}

function NavBodyAdmin() {
    return (
        <>
            <NavButton linkType="dashboard" to="/" />
            <NavButton linkType="transaction_entry" to="/transaction-entry" />
            <NavButton linkType="transaction_history" to="/transaction-history" />
            <NavButton linkType="end_shift_verification" to="/end-shift-verification" />
            <NavButton linkType="login_monitoring" to="/login-monitoring" />
            <NavButton linkType="context_analytics" to="/context-analytics" />
            <NavButton linkType="reports" to="/reports" />
            <NavButton linkType="audit_logs" to="/audit-logs" />
            <NavButton linkType="user_management" to="/user-management" />
            <NavButton linkType="settings" to="/settings" />
        </>
    );
}

export type UserType = "admin" | "frontline";

function NavBody({ userType }: { userType: UserType }) {
    return (
        <div className="py-6 px-4 flex flex-col">{userType === "admin" ? <NavBodyAdmin /> : <NavBodyFrontline />}</div>
    );
}

function NavFooter() {
    return (
        <div className="p-4">
            <NavButton linkType="logout" to="/test" />
        </div>
    );
}

export function NavBar({
    userType,
    profileText = "QC",
    headerText = "PED System",
}: {
    userType: UserType;
    profileText?: string;
    headerText?: string;
}) {
    return (
        <aside className="bg-dark-blue">
            <NavHeader profileText={profileText}>{headerText}</NavHeader>
            <NavBody userType={userType} />
            <NavFooter />
        </aside>
    );
}

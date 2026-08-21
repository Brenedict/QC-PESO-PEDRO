// PEDRO SHARED IMPORTS
import { Role } from "@qcpesopedro/shared/prisma/enums";

// General Imports
import type { ReactNode } from "react";
import { NavLink } from "react-router";

// Components
import { Text } from "./Text";
import Profile, { type ProfileBaseProps } from "./Profile";

// Material UI Icons
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

function NavHeader({ userFullName, profilePicUrl, children }: { children: ReactNode } & ProfileBaseProps) {
    return (
        <div className="flex justify-start items-center gap-3 px-6 py-4">
            <Profile size="small" userFullName={userFullName} profilePicUrl={profilePicUrl} />
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

function NavButton({ linkType, to, isLogout = false }: { linkType: LinkType; to: string; isLogout?: boolean }) {
    const { content, icon: LinkIcon } = linkTypeMap[linkType];

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-2.5 mb-1 text-white rounded-xl block transition-colors ${
                    isActive
                        ? isLogout
                            ? `bg-red-900 hover:bg-red-800`
                            : `bg-primary-blue hover:bg-blue-800`
                        : !isLogout
                          ? `hover:bg-blue-900`
                          : `hover:bg-red-900`
                }`
            }
        >
            <Text
                size="description"
                weight="medium"
                variant="white"
                svg={{ gap: "big", icon: LinkIcon, position: "left", size: "big" }}
            >
                {content}
            </Text>
        </NavLink>
    );
}

function NavBodyFrontline() {
    return (
        <>
            <NavButton linkType="dashboard" to="/" />
            <NavButton linkType="transaction_entry" to="/applicant-form" />
            <NavButton linkType="transaction_history" to="/history" />
            <NavButton linkType="settings" to="/profile" />
        </>
    );
}

function NavBodyAdmin() {
    return (
        <>
            <NavButton linkType="dashboard" to="/" />
            <NavButton linkType="transaction_entry" to="/applicant-form" />
            <NavButton linkType="transaction_history" to="/history" />
            <NavButton linkType="end_shift_verification" to="/end-shift" />
            <NavButton linkType="login_monitoring" to="/monitoring" />
            <NavButton linkType="context_analytics" to="/context-analytics" />
            <NavButton linkType="reports" to="/reports" />
            <NavButton linkType="audit_logs" to="/audit-logs" />
            <NavButton linkType="user_management" to="/user-management" />
            <NavButton linkType="settings" to="/profile" />
        </>
    );
}

function NavBody({ userType }: { userType?: Role }) {
    return (
        <div className="py-6 px-4 flex flex-col">
            {userType === "ADMIN" || userType === "SUPERADMIN" ? <NavBodyAdmin /> : <NavBodyFrontline />}
        </div>
    );
}

function NavFooter() {
    return (
        <div className="p-4">
            <NavButton linkType="logout" to="/log-out" isLogout />
        </div>
    );
}

export function NavBar({
    userType,
    userFullName = "Quezon City",
    profilePicUrl,
    headerText = "PED System",
}: {
    userType?: Role;
    headerText?: string;
} & ProfileBaseProps) {
    return (
        <aside className="bg-dark-blue h-screen flex flex-col justify-between sticky top-0 min-w-64 overscrolll-none">
            <div>
                <NavHeader userFullName={userFullName} profilePicUrl={profilePicUrl}>
                    {headerText}
                </NavHeader>
                <NavBody userType={userType} />
            </div>
            <NavFooter />
        </aside>
    );
}

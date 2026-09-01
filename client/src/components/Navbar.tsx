// PEDRO SHARED IMPORTS
import { Role } from "@qcpesopedro/shared/prisma/enums";

// General Imports
import { type MouseEventHandler, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";

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
import { useAuth } from "../context/AuthContext";

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

interface NavButtonProps {
    linkType: LinkType;
    to: string;
    isLogout?: boolean;
    disabled?: boolean;
}

function NavButton({ linkType, to, isLogout = false, disabled = false }: NavButtonProps) {
    const { content, icon: LinkIcon } = linkTypeMap[linkType];

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        const isActive = location.pathname === to;
        if (isActive) {
            e.preventDefault();
        }
    };

    return (
        <NavLink
            to={to}
            onClick={disabled ? (e) => e.preventDefault() : handleClick}
            className={({ isActive }) =>
                `px-3 py-2.5 mb-1 text-white rounded-xl block transition-colors ${
                    isActive
                        ? isLogout
                            ? `bg-red-900 hover:bg-red-800`
                            : `bg-primary-blue hover:bg-blue-800`
                        : !isLogout
                          ? `hover:bg-blue-900`
                          : `hover:bg-red-900`
                } 
                ${disabled ? "pointer-events-none opacity-50 cursor-not-allowed" : null}
                `
            }
            tabIndex={disabled ? -1 : 0}
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

function NavBody({ userType }: { userType?: Role }) {
    const { user } = useAuth();

    return (
        <div className="py-6 px-4 flex flex-col">
            <NavButton linkType="dashboard" to="/" />
            <NavButton linkType="transaction_entry" to="/applicant-form" disabled={user?.hasEndedShift} />
            <NavButton linkType="transaction_history" to="/history" disabled={user?.hasEndedShift} />
            {(userType === "ADMIN" || userType === "SUPERADMIN") && (
                <>
                    <NavButton linkType="end_shift_verification" to="/end-shift" />
                    <NavButton linkType="login_monitoring" to="/monitoring" disabled={user?.hasEndedShift} />
                    {userType === "SUPERADMIN" && (
                        <>
                            <NavButton
                                linkType="context_analytics"
                                to="/context-analytics"
                                disabled={user?.hasEndedShift}
                            />
                            <NavButton linkType="reports" to="/reports" disabled={user?.hasEndedShift} />
                        </>
                    )}
                    <NavButton linkType="audit_logs" to="/audit-logs" />
                    <NavButton linkType="user_management" to="/user-management" disabled={user?.hasEndedShift} />
                </>
            )}
            <NavButton linkType="settings" to="/profile" disabled={user?.hasEndedShift} />
        </div>
    );
}

function NavFooter() {
    const location = useLocation();
    const redirectPath = `${location.pathname}${location.pathname.at(-1) === "/" ? "log-out" : "/log-out"}`;
    return (
        <div className="p-4">
            <NavButton linkType="logout" to={redirectPath} isLogout />
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

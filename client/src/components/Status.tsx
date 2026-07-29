import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Text } from "./Text";
import type { MaterialIcon, ColorVariant, AlignVariant } from "../types/common.ts";
import { alignClasses } from "../types/common.ts";

// Available variants for each status type
type StatusVariantMap = {
    connection: "online" | "offline" | "loggedout";
    type: "walkin" | "online" | "inhouse";
    outcome: "pending" | "mismatched" | "success";
    verification: "pending" | "approved" | "needsrevision" | "rejected";
    status: "active" | "inactive";
};

// Types of status that can be displayed
export type StatusType = "connection" | "type" | "outcome" | "verification" | "status";

// Dynamic variant type based on status type
export type StatusVariant<T extends StatusType> = StatusVariantMap[T];

// Tailwind CSS color class mappings for status themes
const colorClasses = {
    green: "bg-green-opaque border-green-opaque",
    red: "bg-red-opaque border-red-opaque",
    blue: "bg-grayish-blue-opaque border-grayish-blue-opaque",
    offWhite: "bg-off-white border-off-white-border",
} as const;

// Status Config
interface StatusConfig {
    text: string;
    theme: string;
    variant: ColorVariant;
    icon?: MaterialIcon;
}

// Main configuration map
const statusMap: Record<StatusType, Record<string, StatusConfig>> = {
    connection: {
        online: { text: "Online", variant: "green", theme: colorClasses.green, icon: WifiIcon },
        loggedout: { text: "Logged Out", variant: "grayish-blue", theme: colorClasses.offWhite, icon: LogoutIcon },
        offline: { text: "Offline", variant: "red", theme: colorClasses.red, icon: WifiOffIcon },
    },
    type: {
        walkin: { text: "Walk-In Referral", variant: "primary-blue", theme: colorClasses.blue },
        online: { text: "Online Referral", variant: "primary-blue", theme: colorClasses.blue },
        inhouse: { text: "In-house Recruitment", variant: "primary-blue", theme: colorClasses.blue },
    },
    outcome: {
        pending: { text: "Pending", variant: "grayish-blue", theme: colorClasses.offWhite },
        mismatched: { text: "Mismatch", variant: "red", theme: colorClasses.red },
        success: { text: "Success", variant: "green", theme: colorClasses.green },
    },
    verification: {
        pending: { text: "Pending", variant: "grayish-blue", theme: colorClasses.offWhite },
        approved: { text: "Approved", variant: "green", theme: colorClasses.green, icon: CheckIcon },
        needsrevision: {
            text: "Needs Revision",
            variant: "primary-blue",
            theme: colorClasses.blue,
            icon: ReportProblemOutlinedIcon,
        },
        rejected: { text: "Rejected", variant: "red", theme: colorClasses.red, icon: CancelOutlinedIcon },
    },
    status: {
        active: { text: "Active", variant: "green", theme: colorClasses.green },
        inactive: { text: "Inactive", variant: "red", theme: colorClasses.red },
    },
};

// Status properties
interface StatusProps<T extends StatusType> {
    type: T;
    variant: StatusVariant<T>;
    align?: AlignVariant;
}

function Status<T extends StatusType>({ type, variant, align = "center" }: StatusProps<T>) {
    const config = statusMap[type]?.[variant];

    if (!config) {
        return null;
    }

    const Icon = config.icon;

    return (
        <div className={`px-2.5 py-1 rounded-3xl border flex items-center gap-1.5 w-fit ${config.theme}`}>
            <Text
                size="small"
                weight="semiBold"
                variant={config.variant}
                svg={Icon ? { gap: "small", icon: Icon, position: "left", size: "medium" } : undefined}
                align={align}
            >
                {config.text}
            </Text>
        </div>
    );
}

export default Status;

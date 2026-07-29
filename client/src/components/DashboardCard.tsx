import { Text } from "./Text";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import type { ReactNode } from "react";
import type { MaterialIcon } from "../types/common";

export function CardHeader({ icon, children }: { icon: MaterialIcon; children: ReactNode }) {
    return (
        <Text
            size="description"
            variant="dark-blue"
            align="left"
            weight="bold"
            svg={{
                variant: "primary-blue",
                gap: "big",
                icon: icon,
                position: "left",
                size: "big",
                bg: { variant: "grayish-blue-opaque", padding: "small", type: "normal" },
            }}
        >
            {children}
        </Text>
    );
}

export function PercentageChange({ current, previous }: { current: number; previous: number }) {
    if (current === previous) return null;

    const percentage = ((current - previous) / previous) * 100;
    const isPositive = percentage >= 0;
    const changeText = percentage !== 0 ? `${isPositive ? "+" : ""}${percentage.toFixed(0)}% vs Yesterday` : "";

    const badgeClass = isPositive ? "bg-green-opaque" : "bg-red-opaque text-red";
    const badgeVariant = isPositive ? "green" : "red";
    const badgeIcon = isPositive ? TrendingUpOutlinedIcon : TrendingDownOutlinedIcon;

    return (
        <div className="mt-4 flex justify-center">
            <div className={`${badgeClass} py-1 px-2.5 rounded-xl`}>
                <Text
                    variant={badgeVariant}
                    size="small"
                    weight="bold"
                    svg={{ variant: badgeVariant, gap: "base", position: "left", icon: badgeIcon, size: "medium" }}
                >
                    {changeText}
                </Text>
            </div>
        </div>
    );
}

interface GenderTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}

const iconProps = {
    gap: "base",
    size: "medium",
    position: "left",
} as const;

export function MaleText({ children, className }: GenderTextProps) {
    return (
        <Text
            variant="light-blue"
            size="description"
            weight="medium"
            svg={{ ...iconProps, variant: "light-blue", icon: MaleOutlinedIcon }}
            className={className}
        >
            {children}
        </Text>
    );
}

export function FemaleText({ children, className }: GenderTextProps) {
    return (
        <Text
            variant="pink"
            size="description"
            weight="medium"
            align="right"
            svg={{ ...iconProps, variant: "pink", icon: FemaleOutlinedIcon }}
            className={className}
        >
            {children}
        </Text>
    );
}

export function Divider() {
    return <div className="my-3 border-0 bg-off-white-border h-0.5" />;
}

export function NumberTitle({ children }: { children: ReactNode }) {
    return (
        <Text size="smaller" align="left" variant="grayish-blue" weight="bold">
            <span className="uppercase">{children}</span>
        </Text>
    );
}

export function NumberText({ children }: { children: ReactNode }) {
    return (
        <Text size="bigger" weight="black" variant="dark-blue">
            {children}
        </Text>
    );
}

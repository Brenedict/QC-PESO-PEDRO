// General Imporst
import type { ReactNode } from "react";

// Components
import { Text } from "../components/Text";
import Button from "../components/Button";

// Types
import type { ColorVariant, MaterialIcon, Role } from "../types/common";

// Utils
import { formatShortMonthYear, formatTime } from "../utils/time";

export function ColumnText({ children }: { children: ReactNode }) {
    return (
        <>
            <Text variant="dark-blue" size="description" align="center" weight="semiBold">
                {children}
            </Text>
        </>
    );
}

export function Identifier({ children }: { children: ReactNode }) {
    return (
        <Text font="consolas" size="description" weight="medium" variant="grayish-blue" align="center">
            {children}
        </Text>
    );
}

export function DateTime({ dateTime }: { dateTime: Date }) {
    // Date formatting component
    const getRelativeDateTime = () => {
        const now = new Date();
        const target = new Date(dateTime);

        const isToday = target.toDateString() === now.toDateString();

        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = target.toDateString() === yesterday.toDateString();

        const timeString = formatTime(target);

        if (isToday) {
            return `Today, ${timeString}`;
        }
        if (isYesterday) {
            return `Yesterday, ${timeString}`;
        }

        return timeString;
    };

    return (
        <>
            <div>
                <Text size="description" variant="black" align="center" weight="medium">
                    {formatShortMonthYear(dateTime)}
                </Text>
                <Text size="small" variant="grayish-blue" align="center" weight="normal">
                    {getRelativeDateTime()}
                </Text>
            </div>
        </>
    );
}

export type Action = {
    icon: MaterialIcon;
    text: string;
    handleClick: (id: string, extraParams: unknown) => React.MouseEventHandler<HTMLButtonElement>;
    color: "red" | "black" | "blue";
};

export type ActionTypes = Action[];

const buttonMap = {
    red: { variant: "white-red", iconVariant: "red" },
    blue: { variant: "white-blue", iconVariant: "primary-blue" },
    black: { variant: "white-black", iconVariant: "black" },
} as const;

export function ActionButtons({
    id,
    extraParams,
    actions,
}: {
    id: string;
    extraParams?: unknown;
    actions?: ActionTypes;
}) {
    return (
        <>
            {actions?.map((action, index) => (
                <Button
                    key={index}
                    variant={buttonMap[action.color].variant}
                    size="tiny"
                    leftIcon={{
                        icon: action.icon,
                        size: "medium",
                        variant: buttonMap[action.color].iconVariant as ColorVariant,
                    }}
                    onClick={action.handleClick(id, extraParams ?? {})}
                >
                    {action.text}
                </Button>
            ))}
        </>
    );
}

export function ActionButton({
    id,
    text,
    handleClick,
}: {
    id: string;
    text: string;
    handleClick: (id: string) => React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <Button variant="opaque-blue" size="tiny" onClick={handleClick(id)}>
            {text}
        </Button>
    );
}

const badgeMap = {
    SUPERADMIN: { text: "white", bg: "border-dark-blue bg-dark-blue" },
    ADMIN: { text: "primary-blue", bg: "border-primary-blue bg-grayish-blue-opaque" },
    FRONTLINE: { text: "grayish-blue", bg: "border-off-white-border bg-off-white" },
} as const;

// Badge for the Role
export function RoleBadge({ role }: { role: Role }) {
    return (
        <div className={`px-3 py-1 rounded-md border  w-fit mx-auto ${badgeMap[role].bg}`}>
            <Text size="small" weight="bold" variant={badgeMap[role].text as any} align="center" className="uppercase">
                {role === "SUPERADMIN" ? "SUPER ADMIN" : role === "ADMIN" ? "Administrator" : "Frontline Encoder"}
            </Text>
        </div>
    );
}
export function ColumnDesc({ children }: { children: ReactNode }) {
    return (
        <Text size="description" variant="grayish-blue" align="center">
            {children}
        </Text>
    );
}

export function ColumnDescItalic({ children }: { children: ReactNode }) {
    return (
        <Text size="description" variant="grayish-blue" align="center" className="italic">
            {children}
        </Text>
    );
}

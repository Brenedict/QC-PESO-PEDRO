import type { ReactNode } from "react";
import { Text } from "../components/Text";
import Button from "../components/Button";

import type { ColorVariant, MaterialIcon, Role } from "../types/common";

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

        const timeString = target.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
                    {dateTime.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
    actions: ActionTypes;
}) {
    return (
        <>
            {actions.map((action) => (
                <Button
                    key={action.text}
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
    admin: { text: "primary-blue", bg: "border-primary-blue bg-grayish-blue-opaque" },
    frontline: { text: "grayish-blue", bg: "border-off-white-border bg-off-white" },
} as const;

// Badge for the Role
export function RoleBadge({ role }: { role: Role }) {
    return (
        <div className={`px-3 py-1 rounded-md border  w-fit mx-auto ${badgeMap[role].bg}`}>
            <Text size="small" weight="bold" variant={badgeMap[role].text} align="center" className="uppercase">
                {role === "admin" ? "Administrator" : "Frontline Encoder"}
            </Text>
        </div>
    );
}

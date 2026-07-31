import type { ReactNode } from "react";
import { Text } from "../components/Text";
import Button from "../components/Button";

import type { ColorVariant, MaterialIcon } from "../types/common";

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
    return (
        <>
            <div>
                <Text size="description" variant="black" align="center" weight="medium">
                    {dateTime.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </Text>
                <Text size="small" variant="grayish-blue" align="center" weight="normal">
                    {dateTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                </Text>
            </div>
        </>
    );
}

export type Action = {
    icon: MaterialIcon;
    text: string;
    handleClick: (id: string) => React.MouseEventHandler<HTMLButtonElement>;
    color: "red" | "black" | "blue";
};

export type ActionTypes = Action[];

const buttonMap = {
    red: { variant: "white-red", iconVariant: "red" },
    blue: { variant: "white-blue", iconVariant: "primary-blue" },
    black: { variant: "white-black", iconVariant: "black" },
} as const;

export function ActionButtons({ id, actions }: { id: string; actions: ActionTypes }) {
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
                    onClick={action.handleClick(id)}
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

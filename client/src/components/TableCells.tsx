import type { ReactNode } from "react";
import { Text } from "../components/Text";
import Button from "../components/Button";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

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
        <Text font="consolas" size="small" weight="medium" variant="grayish-blue" align="center">
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

export function ActionButtons({ id }: { id: string }) {
    // Dummy handler lang (babaguhin pa in future)
    const handleEdit = async () => {
        console.log(id);
    };

    const handleDisable = async () => {
        console.log(id);
    };

    return (
        <>
            <Button
                variant="white-black"
                size="tiny"
                leftIcon={{ icon: BorderColorOutlinedIcon, size: "medium", variant: "black" }}
                onClick={handleEdit}
            >
                Edit
            </Button>
            <Button
                variant="white-red"
                size="tiny"
                leftIcon={{ icon: PersonRemoveOutlinedIcon, size: "medium", variant: "red" }}
                onClick={handleDisable}
            >
                Delete
            </Button>
        </>
    );
}

export function ActionButton({ id, children }: { id: string; children: ReactNode }) {
    const handleClick = async () => {
        console.log(id);
    };

    return (
        <Button variant="opaque-blue" size="tiny" onClick={handleClick}>
            {children}
        </Button>
    );
}

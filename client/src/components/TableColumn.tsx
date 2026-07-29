import type { ReactNode } from "react";
import { Text } from "./Text";

export function BoldColumnText({ children }: { children: ReactNode }) {
    return (
        <>
            <Text variant="dark-blue" size="description" align="center" weight="semiBold">
                {children}
            </Text>
        </>
    );
}

export function ConsolasText({ children }: { children: ReactNode }) {
    return (
        <Text font="consolas" size="description" weight="medium" variant="grayish-blue" align="center">
            {children}
        </Text>
    );
}

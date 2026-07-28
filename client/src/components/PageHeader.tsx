import type { ReactNode } from "react";
import { Text } from "./Text";
import { type IconProps } from "./Icon";

// Title and description of the page
function PageHeader({
    primaryText,
    secondaryText,
    icon,
    children,
}: {
    primaryText: string;
    secondaryText: string;
    icon?: IconProps;
    children?: ReactNode;
}) {
    return (
        <div className="mb-6 flex justify-between items-center">
            <div>
                <Text
                    size="big"
                    weight="bold"
                    variant="dark-blue"
                    svg={icon ? { ...icon, position: "left", gap: "big" } : undefined}
                >
                    {primaryText}
                </Text>
                <Text size="normal" weight="normal" variant="grayish-blue">
                    {secondaryText}
                </Text>
            </div>
            {children}
        </div>
    );
}

export default PageHeader;

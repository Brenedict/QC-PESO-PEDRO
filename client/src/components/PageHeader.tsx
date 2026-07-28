import type { ReactNode } from "react";
import { Text } from "./Text";

// Title and description of the page
function PageHeader({
    primaryText,
    secondaryText,
    children,
}: {
    primaryText: string;
    secondaryText: string;
    children?: ReactNode;
}) {
    return (
        <div className="mb-6 flex justify-between items-center">
            <div>
                <Text size="big" weight="bold" variant="dark-blue">
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

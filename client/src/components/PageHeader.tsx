import { Text } from "./Text";

// Title and description of the page
function PageHeader({ primaryText, secondaryText }: { primaryText: string; secondaryText: string }) {
    return (
        <div className="mb-6">
            <Text size="big" weight="bold" variant="dark-blue">
                {primaryText}
            </Text>
            <Text size="normal" weight="normal" variant="grayish-blue">
                {secondaryText}
            </Text>
        </div>
    );
}

export default PageHeader;

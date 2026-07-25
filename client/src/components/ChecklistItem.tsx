import { Text } from "./Text";

function ChecklistItem({
    name,
    children,
    variant = "normal",
}: {
    name: string;
    children: React.ReactNode;
    variant: "normal" | "stylized";
}) {
    const additionalClass =
        variant == "stylized" ? "bg-off-white border-1 border-off-white-border rounded-xl py-1.5 px-3" : "";
    return (
        <div className={`flex gap-2 ${additionalClass}`}>
            <input className="accent-primary-blue" id={name} name={name} type="checkbox" value="true" />
            <label htmlFor={name}>
                <Text size="description" variant="black">
                    {children}
                </Text>
            </label>
        </div>
    );
}

export default ChecklistItem;

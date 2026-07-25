import { Text } from "./Text";

interface OptionsProp {
    name: string;
    children: React.ReactNode;
    type: "checkbox" | "radio";
    stylized: boolean;
}

export function ChecklistItem({ name, children, type = "checkbox", stylized = false }: OptionsProp) {
    const additionalClass = stylized ? "bg-off-white border-1 border-off-white-border rounded-xl py-1.5 px-3" : "";
    return (
        <div className={`flex gap-2 ${additionalClass}`}>
            <input className="accent-primary-blue" id={name} name={name} type={type} value="true" />
            <label htmlFor={name}>
                <Text size="description" variant="black">
                    {children}
                </Text>
            </label>
        </div>
    );
}

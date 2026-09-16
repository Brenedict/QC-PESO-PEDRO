// Components
import { Text } from "./Text";

interface OptionsProp extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
    inputVariant?: "checkbox" | "radio";
    stylized?: boolean;
}

function ChoiceItem({ children, inputVariant = "checkbox", stylized = false, ...props }: OptionsProp) {
    const baseClass = stylized ? "bg-off-white border-1 border-off-white-border rounded-xl py-1.5 px-3" : "";
    return (
        <label className={`flex gap-2 ${baseClass}`}>
            <input className="accent-primary-blue" type={inputVariant} {...props} />
            <Text size="description" variant="black">
                {children}
            </Text>
        </label>
    );
}

export default ChoiceItem;

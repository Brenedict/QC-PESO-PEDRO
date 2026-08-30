// General Imports
import { useState, type InputHTMLAttributes, type ReactNode } from "react";

// Components
import Button, { type ButtonVariant } from "../Button";
import { Card } from "../Card";
import { Text, type WeightVariant } from "../Text";
import Icon from "../Icon";

// Types
import type { ColorVariant, MaterialIcon, SizeVariant } from "../../types/common";
import { formatCapitalize } from "../../utils/text";

export function GrayMiniCard({
    descriptionText,
    valueText,
    descriptionSize = "small",
    valueSize = "normal",
    variant = "dark-blue",
    weight = "semiBold",
}: {
    descriptionText: ReactNode;
    valueText: ReactNode;
    descriptionSize?: SizeVariant;
    valueSize?: SizeVariant;
    variant?: ColorVariant;
    weight?: WeightVariant;
}) {
    return (
        <Card dropShadow={false} className="w-full">
            <Card.Body variant="off-white" className="h-full">
                <Text variant="grayish-blue" size={descriptionSize} weight="bold">
                    {descriptionText}
                </Text>
                <Text {...{ variant, weight, size: valueSize }}>{valueText}</Text>
            </Card.Body>
        </Card>
    );
}

interface PopupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    className?: string;
    leftIcon?: {
        icon: MaterialIcon;
        variant: ColorVariant;
    };
}

export function PopupButton({ children, variant, leftIcon, className, ...props }: PopupButtonProps) {
    return (
        <Button
            leftIcon={leftIcon ? { icon: leftIcon.icon, size: "bigMedium", variant: leftIcon.variant } : undefined}
            variant={variant}
            size="small"
            className={`py-2! px-4! ${className}`}
            {...props}
        >
            {children}
        </Button>
    );
}

export function LabeledSection({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className={`text-dark-blue w-full`}>
            <p className="text-description font-medium block w-full mb-1">{label}</p>
            {children}
        </div>
    );
}

export function ContextBadge({
    clickable = true,
    children,
    defaultChecked = false,
    ...props
}: { children: ReactNode; clickable?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
    const [selected, setSelected] = useState(defaultChecked);

    if (!clickable) {
        return (
            <label
                className={`block w-fit px-3 py-1 text-small-description rounded-3xl select-none bg-off-white text-grayish-blue border border-off-white-border font-medium    }`}
            >
                <input type="checkbox" name="context" hidden defaultChecked={defaultChecked} {...props} />
                {formatCapitalize(children as string)}
            </label>
        );
    }

    return (
        <label
            className={`cursor-pointer block w-fit px-3 py-1 text-small-description rounded-3xl transition-transform hover:scale-105 select-none ${selected ? "bg-primary-blue text-white font-bold hover:bg-blue-950" : "bg-off-white text-grayish-blue border border-off-white-border font-medium hover:bg-off-white-border  "}`}
            onChange={() => setSelected((prevSelected) => !prevSelected)}
        >
            <input type="checkbox" name="context" hidden defaultChecked={defaultChecked} {...props} />
            {children}
        </label>
    );
}

interface PopupIconProps {
    icon: MaterialIcon;
    variant?: "red" | "blue";
}

export function PopupIcon({ icon, variant = "red" }: PopupIconProps) {
    return (
        <div className="flex justify-center mb-4">
            <Icon
                icon={icon}
                size="giant"
                variant={variant === "red" ? "red" : "primary-blue"}
                bg={{
                    padding: "big",
                    type: "circle",
                    variant: variant === "red" ? "red-opaque" : "grayish-blue-opaque",
                }}
            ></Icon>
        </div>
    );
}

export function PopupHeader({ children }: { children: ReactNode }) {
    return (
        <Text size="medium" weight="bold" align="center" className="mb-2">
            {children}
        </Text>
    );
}

export function PopupDescription({ children }: { children: ReactNode }) {
    return (
        <div className="mb-4">
            <Text variant="grayish-blue" align="center">
                {children}
            </Text>
        </div>
    );
}

export function PopupNotice({
    additionalSection,
    children,
    variant = "red",
}: {
    additionalSection?: ReactNode;
    children: ReactNode;
    variant?: "red" | "off-white";
}) {
    return (
        <div className="flex justify-center w-full">
            <Card className="w-full" dropShadow={false}>
                <Card.Body variant={variant === "red" ? "red-opaque" : "off-white"} className="p-3!">
                    {additionalSection}
                    <Text variant={variant === "red" ? "red" : "grayish-blue"} weight="medium" align="center">
                        {children}
                    </Text>
                </Card.Body>
            </Card>
        </div>
    );
}

import type { ReactNode } from "react";
import type { ColorVariant, MaterialIcon, SizeVariant } from "../../types/common";
import Button, { type ButtonProps, type ButtonVariant } from "../Button";
import { Card } from "../Card";
import { Text, type WeightVariant } from "../Text";

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

export function ContextBadge({ highlighted = false, children }: { highlighted?: boolean; children: ReactNode }) {
    return (
        <div
            className={`font-medium w-fit px-3 py-1 text-small-description rounded-3xl ${highlighted ? "bg-primary-blue text-white" : "bg-off-white text-grayish-blue border border-off-white-border  "}`}
        >
            {children}
        </div>
    );
}

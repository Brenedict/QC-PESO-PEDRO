import React, { type ReactNode } from "react";
import Icon from "./Icon";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ColorClasses } from "../types/common";
import Button, { variantStyles } from "./Button";

export type ReducedColorVariant = Extract<
    keyof typeof ColorClasses,
    "white" | "off-white" | "grayish-blue-opaque" | "red-opaque" | "primary-blue" | "gray"
>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: ReducedColorVariant;
    bordered?: true | false;
    className?: string;
}

function CardContainer({
    children,
    className,
    dropShadow = true,
    onClick,
    ...props
}: {
    children?: ReactNode;
    className?: string;
    dropShadow?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
    return (
        <div
            onClick={onClick}
            className={`rounded-2xl overflow-clip ${onClick ? `${variantStyles.white} transition-transform cursor-pointer` : "border bg-white  border-off-white-border"}  ${dropShadow ? "drop-shadow-sm" : ""}  ${className} `}
            {...props}
        >
            {children}
        </div>
    );
}

function Header({
    children,
    variant = "off-white",
    bordered = true,
    className,
    toggleRightIcon = false,
    onRightAction,
    ...props
}: CardProps & { toggleRightIcon?: boolean; onRightAction?: () => void }) {
    const defaultClass = `${ColorClasses[variant].bg} ${bordered == true ? "border-b border-off-white-border" : ""}`;
    return (
        <div className={`${defaultClass} w-full px-[24px] py-[16px] flex justify-between ${className}`} {...props}>
            {children}
            {toggleRightIcon && (
                <Button onClick={onRightAction} size="small" variant="red" className="min-w-0! w-8">
                    <Icon icon={CloseRoundedIcon} variant="white" size="bigMedium"></Icon>
                </Button>
            )}
        </div>
    );
}

function Body({ children, variant = "white", bordered = false, className, ...props }: CardProps) {
    const defaultClass = `${ColorClasses[variant].bg} ${bordered == true ? "border-b border-t border-off-white-border" : ""}`;
    return (
        <div className={`${defaultClass} w-full px-[24px] py-[16px] ${className}`} {...props}>
            {children}
        </div>
    );
}

function Footer({ children, variant = "off-white", bordered = true, className, ...props }: CardProps) {
    const defaultClass = `${ColorClasses[variant].bg} ${bordered == true ? "border-t border-off-white-border" : ""}`;
    return (
        <div className={`${defaultClass} w-full px-[24px] py-[16px] ${className}`} {...props}>
            {children}
        </div>
    );
}

export const Card = Object.assign(CardContainer, {
    Header,
    Body,
    Footer,
});

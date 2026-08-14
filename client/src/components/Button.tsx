import React from "react";
import Icon, { type IconProps } from "./Icon";

// Available color and size variants
export type ButtonVariant = | "blue" | "opaque-blue" | "red" | "green" | "navy" | "white" | "white-black" | "white-red" | "white-blue";
export type ButtonSize = "tiny" | "smaller" | "small" | "normal" | "large";

// Properties that can be passed to the button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: IconProps;
    rightIcon?: IconProps;
    children: React.ReactNode;
}

// Tailwind CSS classes per color variant
export const variantStyles: Record<ButtonVariant, string> = {
    blue: "bg-[#004B87] text-white border-none hover:bg-[#003865] hover:scale-105",
    "opaque-blue": "bg-grayish-blue-opaque text-primary-blue border-none hover:bg-[#e0e7fe] hover:scale-105",
    red: "bg-[#EF4444] text-white border-none hover:bg-[#dc2626] hover:scale-105",
    green: "bg-[#10B981] text-white border-none hover:bg-[#059669] hover:scale-105",
    navy: "bg-[#1E293B] text-white border-none hover:bg-[#0f172a] hover:scale-105",
    white: "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F3FAFC] hover:scale-105",
    "white-red": "bg-white text-[#EF4444] border border-[#E2E8F0] hover:bg-[#F3FAFC] hover:scale-105",
    "white-black": "bg-white text-[#1E293B] border border-[#E2E8F0] hover:bg-[#F3FAFC] hover:scale-105",
    "white-blue": "bg-white text-[#004B87] border border-[#E2E8F0] hover:bg-[#F3FAFC] hover:scale-105",
};

// Tailwind CSS classes per size variant
const sizeStyles: Record<ButtonSize, string> = {
    tiny: "px-3 py-1.5 text-small-description rounded-xl",
    smaller: "px-3 py-1.5 text-description rounded-xl",
    small: "px-3 py-1.5 min-w-[100px] text-sm rounded-xl",
    normal: "px-6 py-2.5 min-w-[160px] text-base rounded-2xl",
    large: "px-8 py-3 min-w-[200px] text-lg rounded-2xl",
};

// Standard base styles for ALL buttons
const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-transform transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

// Main logic of the Button component
const Button = ({
    variant = "blue",
    size = "normal",
    leftIcon,
    rightIcon,
    children,
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className} flex items-center`}
            {...props}
        >
            {leftIcon && <Icon {...leftIcon} />}
            <div>{children}</div>
            {rightIcon && <Icon {...rightIcon} />}
        </button>
    );
};

export default Button;

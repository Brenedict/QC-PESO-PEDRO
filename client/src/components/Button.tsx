import React from "react";

// Available color and size variants
type Variant = "blue" | "red" | "green" | "navy" | "white";
type Size = "small" | "normal" | "large";

// Properties that can be passed to the button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

// Tailwind CSS classes per color variant
const variantStyles: Record<Variant, string> = {
    blue: "bg-[#004B87] text-white border-none hover:bg-[#003865]",
    red: "bg-[#EF4444] text-white border-none hover:bg-[#dc2626]",
    green: "bg-[#10B981] text-white border-none hover:bg-[#059669]",
    navy: "bg-[#1E293B] text-white border-none hover:bg-[#0f172a]",
    white: "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]",
};

// Tailwind CSS classes per size variant
const sizeStyles: Record<Size, string> = {
    small: "px-3 py-1.5 min-w-[100px] text-sm rounded-lg",
    normal: "px-6 py-2.5 min-w-[160px] text-base rounded-xl",
    large: "px-8 py-3 min-w-[200px] text-lg rounded-2xl",
};

// Standard base styles for ALL buttons
const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all duration-200 shadow-sm";

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
        <button className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
            {}
            {leftIcon && <span className="flex items-center">{leftIcon}</span>}

            {}
            {children}

            {}
            {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </button>
    );
};

export default Button;

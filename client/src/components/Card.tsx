import React, { type ReactNode } from "react";

export const CardBgClasses = {
    white: "bg-white",
    "off-white": "bg-off-white",
    "grayish-blue-opaque": "bg-grayish-blue-opaque",
} as const;

export type CardColorVariant = keyof typeof CardBgClasses;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: CardColorVariant;
    bordered?: true | false;
    className?: string;
}

function CardContainer({ children, className, ...props }: { children?: ReactNode; className?: string }) {
    return (
        <div
            className={`bg-white border-1 border-off-white-border rounded-xl drop-shadow-sm overflow-clip ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

function Header({ children, variant = "off-white", bordered = true, className, ...props }: CardProps) {
    const defaultClass = `${CardBgClasses[variant]} ${bordered == true ? "border-b border-off-white-border" : ""}`;
    return (
        <div className={`${defaultClass} w-full px-[24px] py-[16px] ${className}`} {...props}>
            {children}
        </div>
    );
}

function Body({ children, variant = "white", bordered = false, className, ...props }: CardProps) {
    const defaultClass = `${CardBgClasses[variant]} ${bordered == true ? "border-b border-t border-off-white-border" : ""}`;
    return (
        <div className={`${defaultClass} w-full px-[24px] py-[16px] ${className}`} {...props}>
            {children}
        </div>
    );
}

function Footer({ children, variant = "off-white", bordered = true, className, ...props }: CardProps) {
    const defaultClass = `${CardBgClasses[variant]} ${bordered == true ? "border-t border-off-white-border" : ""}`;
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

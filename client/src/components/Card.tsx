import React, { type ReactNode } from "react";

export const CardBgClasses = {
    white: "bg-white",
    "off-white": "bg-off-white",
    "grayish-blue-opaque": "bg-grayish-blue-opaque",
} as const;

export type CardColorVariant = keyof typeof CardBgClasses;

interface CardProps {
    children: ReactNode;
    variant?: CardColorVariant;
    bordered?: true | false;
}

function CardContainer({ children, additionalClass, ...props }: { children?: ReactNode; additionalClass?: string }) {
    return (
        <div
            className={`bg-white border-1 border-off-white-border rounded-xl drop-shadow-sm overflow-clip ${additionalClass}`}
            {...props}
        >
            {children}
        </div>
    );
}

function Header({ children, variant = "off-white", bordered = true, ...props }: CardProps) {
    const additionalClass = `${CardBgClasses[variant]} ${bordered == true ? "border-b border-off-white-border" : ""}`;
    return (
        <div className={`${additionalClass} w-full px-[24px] py-[16px]`} {...props}>
            {children}
        </div>
    );
}

function Body({ children, variant = "white", bordered = false, ...props }: CardProps) {
    const additionalClass = `${CardBgClasses[variant]} ${bordered == true ? "border-b-1 border-t-1 border-off-white-border" : ""}`;
    return (
        <div className={`${additionalClass} w-full px-[24px] py-[16px]`} {...props}>
            {children}
        </div>
    );
}

function Footer({ children, variant = "off-white", bordered = true, ...props }: CardProps) {
    const additionalClass = `${CardBgClasses[variant]} ${bordered == true ? "border-1 border-off-white-border" : ""}`;
    return (
        <div className={`${additionalClass} w-full px-[24px] py-[16px]`} {...props}>
            {children}
        </div>
    );
}

export const Card = Object.assign(CardContainer, {
    Header,
    Body,
    Footer,
});

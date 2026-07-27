import Icon, { type IconProps } from "./Icon";
import { SizeClasses, type SizeVariant, ColorClasses, type ColorVariant } from "../types/common.ts";

const weightClasses = {
    bold: "font-bold",
    semiBold: "font-semibold",
    medium: "font-medium",
    normal: "font-normal",
    thin: "font-thin",
} as const;

// Extracts: "bold" | "normal" | "thin"
export type WeightVariant = keyof typeof weightClasses;

const fontClasses = {
    default: "font-sans",
    consolas: "font-consolas",
} as const;

// Extracts: "default" | "consolas"
export type FontVariant = keyof typeof fontClasses;
export type svgPosition = "left" | "right"; // For position

const gapClasses = {
    none: "gap-0",
    small: "gap-1",
    base: "gap-1.5",
    medium: "gap-2",
    big: "gap-3",
    large: "gap-4",
    extraLarge: "gap-6",
} as const;

// Extracts: "none", "small", "medium", "large", "extraLarge"
export type gapVariant = keyof typeof gapClasses;

const alignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
} as const;

// Extracts: "left", "right", "center"
export type AlignVariant = keyof typeof alignClasses;

interface HeadingProp {
    children?: React.ReactNode;
    size?: SizeVariant;
    variant?: ColorVariant;
    weight?: WeightVariant;
    font?: FontVariant;
    align?: AlignVariant;
    svg?: Omit<IconProps, "variant"> & {
        //Icon type (you can pass the name here)
        position: svgPosition;
        gap: gapVariant;
    };
}

export function Text({
    children,
    size = "normal",
    variant = "black",
    weight = "normal",
    font = "default",
    align = "left",
    svg,
}: HeadingProp) {
    return (
        <div
            className={`w-full flex items-center justify-start ${svg?.position === "right" ? "flex-row-reverse" : "flex-row"} ${svg ? gapClasses[svg.gap] : ""}`}
        >
            {svg && <Icon icon={svg.icon} size={svg.size} variant={variant} />}
            <p
                className={`${SizeClasses[size]} ${ColorClasses[variant].text} ${weightClasses[weight]} ${fontClasses[font]} ${alignClasses[align]}  grow `}
            >
                {children}
            </p>
        </div>
    );
}

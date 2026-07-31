import Icon, { type IconProps } from "./Icon";
import {
    SizeClasses,
    type SizeVariant,
    ColorClasses,
    type ColorVariant,
    type AlignVariant,
    alignClasses,
    type MaterialIcon,
} from "../types/common.ts";

const weightClasses = {
    black: "font-black",
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

interface HeadingProp extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: React.ReactNode;
    size?: SizeVariant;
    variant?: ColorVariant;
    weight?: WeightVariant;
    font?: FontVariant;
    align?: AlignVariant;
    svg?: Omit<IconProps, "variant" | "align"> & {
        //Icon type (you can pass the name here)
        variant?: ColorVariant;
        position: svgPosition;
        gap: gapVariant;
    };
    className?: string;
}

export function Text({
    children,
    size = "normal",
    variant = "black",
    weight = "normal",
    font = "default",
    align = "left",
    svg,
    className,
}: HeadingProp) {
    return (
        <div
            className={`w-full flex items-center justify-start ${svg?.position === "right" ? "flex-row-reverse" : "flex-row"} ${svg ? gapClasses[svg.gap] : ""} ${className}`}
        >
            {svg && <Icon icon={svg.icon} size={svg.size} variant={svg.variant || variant} bg={svg.bg} />}
            <p
                className={`${SizeClasses[size]} ${ColorClasses[variant].text} ${weightClasses[weight]} ${fontClasses[font]} ${alignClasses[align]}  grow ${className}`}
            >
                {children}
            </p>
        </div>
    );
}

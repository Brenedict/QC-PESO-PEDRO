import type { MaterialIcon } from "../utils/Svg";

const sizeClasses = {
    giant: "text-giant",
    bigger: "text-bigger",
    big: "text-big",
    bigMedium: "text-big-medium",
    medium: "text-medium",
    normal: "text-normal",
    description: "text-description",
    small: "text-small-description",
    smaller: "text-smaller-description",
    smallest: "text-smallest-description",
} as const;

// Extracts: "bold" | "normal" | "thin"
export type SizeVariant = keyof typeof sizeClasses;

const variantClasses = {
    black: "text-black",
    white: "text-white",
    "primary-blue": "text-primary-blue",
    "dark-blue": "text-dark-blue",
    "grayish-blue": "text-grayish-blue",
    red: "text-red",
    green: "text-green",
    "light-blue": "text-light-blue",
    pink: "text-pink",
} as const;

// Extracts: "black" | "white" | "primary-blue" | "dark-blue"
export type HeadingVariant = keyof typeof variantClasses;

const weightClasses = {
    bold: "font-bold",
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
    medium: "gap-2",
    large: "gap-4",
    extraLarge: "gap-6",
} as const;

// Extracts: "none", "small", "medium", "large", "extraLarge"
export type gapVariant = keyof typeof gapClasses;

interface HeadingProp {
    children: React.ReactNode;
    size?: SizeVariant;
    variant?: HeadingVariant;
    weight?: WeightVariant;
    font?: FontVariant;
    svg?: {
        //Icon type (you can pass the name here)
        icon: MaterialIcon;
        position: svgPosition;
        gap: gapVariant;
        size: SizeVariant;
    };
}

export function Text({
    children,
    size = "normal",
    variant = "black",
    weight = "normal",
    font = "default",
    svg,
}: HeadingProp) {
    return (
        <div
            className={`flex items-center ${svg?.position === "right" ? "flex-row-reverse" : "flex-row"} ${svg ? gapClasses[svg.gap] : ""}`}
        >
            {svg && (
                <>
                    <svg.icon className={`${variantClasses[variant]} ${sizeClasses[svg.size]}!`} />
                </>
            )}
            <p
                className={`${sizeClasses[size]} ${variantClasses[variant]} ${weightClasses[weight]} ${fontClasses[font]}`}
            >
                {children}
            </p>
        </div>
    );
}

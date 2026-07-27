import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type MaterialIcon = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
};

// Role Types
export type Role = "admin" | "frontline";

// Size Classes (Text and SVG)
export const SizeClasses = {
    iconHero: "text-icon-hero",
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

// Extracts: "giant" | "bigger"| "big" | "bigMedium"...
export type SizeVariant = keyof typeof SizeClasses;

const colors = [
    "black",
    "white",
    "primary-blue",
    "off-white",
    "off-white-border",
    "dark-blue",
    "grayish-blue",
    "grayish-blue-opaque",
    "red",
    "red-opaque",
    "green",
    "green-opaque",
    "light-blue",
    "pink",
] as const;

// typeof colors = readonly ["black", "white", "red"]
// (typeof colors)[number] = "black" | "white" | "red" -> Extract elements as types
export const ColorClasses = Object.fromEntries(
    colors.map((color) => [color, { text: `text-${color}`, bg: `bg-${color}` }]) // Key-vaue pair
) as Readonly<Record<(typeof colors)[number], { text: string; bg: string }>>;

// Extracts: "black" | "white" | "primary-blue" | "dark-blue"
export type ColorVariant = keyof typeof ColorClasses;

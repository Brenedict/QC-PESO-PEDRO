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

export const ColorClasses = {
    black: { bg: "bg-black", text: "text-black" },
    white: { bg: "bg-white", text: "text-white" },
    "primary-blue": { bg: "bg-primary-blue", text: "text-primary-blue" },
    "off-white": { bg: "bg-off-white", text: "text-off-white" },
    "off-white-border": { bg: "bg-off-white-border", text: "text-off-white-border" },
    "dark-blue": { bg: "bg-dark-blue", text: "text-dark-blue" },
    "grayish-blue": { bg: "bg-grayish-blue", text: "text-grayish-blue" },
    "grayish-blue-opaque": { bg: "bg-grayish-blue-opaque", text: "text-grayish-blue-opaque" },
    red: { bg: "bg-red", text: "text-red" },
    "red-opaque": { bg: "bg-red-opaque", text: "text-red-opaque" },
    green: { bg: "bg-green", text: "text-green" },
    "green-opaque": { bg: "bg-green-opaque", text: "text-green-opaque" },
    "light-blue": { bg: "bg-light-blue", text: "text-light-blue" },
    pink: { bg: "bg-pink", text: "text-pink" },
    gray: { bg: "bg-gray", text: "text-gray" },
    purple: { bg: "bg-purple", text: "text-purple" },
    yellow: { bg: "bg-yellow", text: "text-yellow" },
} as const;

// Extracts: "black" | "white" | "primary-blue" | "dark-blue"
export type ColorVariant = keyof typeof ColorClasses;

export const alignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
} as const;

// Extracts: "left", "right", "center"
export type AlignVariant = keyof typeof alignClasses;

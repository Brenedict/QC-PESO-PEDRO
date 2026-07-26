import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type MaterialIcon = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
};

// Role Types
export type Role = "admin" | "frontline";

// Size Classes (Text and SVG)
export const SizeClasses = {
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
export type ColorVariant = keyof typeof ColorClasses;

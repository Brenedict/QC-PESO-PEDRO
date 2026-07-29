import { type MaterialIcon, type SizeVariant, SizeClasses, type ColorVariant, ColorClasses } from "../types/common";

const alignClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
} as const;

type AlignType = keyof typeof alignClasses;

export interface IconProps {
    icon: MaterialIcon;
    size: SizeVariant;
    variant: ColorVariant;
    align?: AlignType;
    bg?: {
        variant: ColorVariant;
        type: "normal" | "circle";
        padding: "small" | "big";
    };
}

function Icon({ icon, size, variant, bg, align = "center" }: IconProps) {
    const IconType = icon;

    // Get background styles if it exists
    const bgStyles = bg
        ? `${ColorClasses[bg.variant].bg} ${bg.type === "normal" ? "rounded-xl" : "rounded-full"} ${bg.padding === "small" ? "p-2" : "p-3"}`
        : "";

    return (
        <div className={` aspect-square flex w-fit ${alignClasses[align]} items-center ${bgStyles}`}>
            <IconType
                className={`${ColorClasses[variant].text}  stroke-0 `}
                style={{ fontSize: `var(--${SizeClasses[size]})` }}
            />
        </div>
    );
}

export default Icon;

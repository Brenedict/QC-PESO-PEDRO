import { type MaterialIcon, type SizeVariant, SizeClasses, type ColorVariant, ColorClasses } from "../types/common";

export interface IconProps {
    icon: MaterialIcon;
    size: SizeVariant;
    variant: ColorVariant;
    bg?: {
        variant: ColorVariant;
        type: "normal" | "circle";
        padding: "small" | "big";
    };
}

function Icon({ icon, size, variant, bg }: IconProps) {
    const IconType = icon;

    // Get background styles if it exists
    const bgStyles = bg
        ? `${ColorClasses[bg.variant].bg} ${bg.type === "normal" ? "rounded-xl" : "rounded-full"} ${bg.padding === "small" ? "p-2" : "p-3"}`
        : "";

    return (
        <div className={` aspect-square flex justify-center items-center ${bgStyles}`}>
            <IconType
                className={`${ColorClasses[variant].text}  stroke-0 `}
                style={{ fontSize: `var(--${SizeClasses[size]})` }}
            />
        </div>
    );
}

export default Icon;

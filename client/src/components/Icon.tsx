import { type MaterialIcon, type SizeVariant, SizeClasses, type ColorVariant, ColorClasses } from "../types/common";

export interface IconProps {
    icon: MaterialIcon;
    size: SizeVariant;
    variant: ColorVariant;
}

function Icon({ icon, size, variant }: IconProps) {
    const IconType = icon;

    return (
        <IconType className={`${ColorClasses[variant]} stroke-0`} style={{ fontSize: `var(--${SizeClasses[size]})` }} />
    );
}

export default Icon;

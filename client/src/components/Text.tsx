const sizeClasses = {
    giant: "text-giant",
    bigger: "text-bigger",
    big: "text-big",
    smallBig: "text-small-big",
    medium: "text-medium",
    normal: "text-normal",
    description: "text-description",
    small: "text-small-description",
    smaller: "text-smaller-description",
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

interface HeadingProp {
    children: React.ReactNode;
    size?: SizeVariant;
    variant?: HeadingVariant;
    weight?: WeightVariant;
    font?: FontVariant;
}

export function Text({
    children,
    size = "normal",
    variant = "black",
    weight = "normal",
    font = "default",
}: HeadingProp) {
    return (
        <p className={`${sizeClasses[size]} ${variantClasses[variant]} ${weightClasses[weight]} ${fontClasses[font]}`}>
            {children}
        </p>
    );
}

const sizeClasses = {
    giant: "text-giant",
    bigger: "text-bigger",
    big: "text-big",
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

interface HeadingProp {
    children: React.ReactNode;
    size?: SizeVariant;
    variant?: HeadingVariant;
    weight?: WeightVariant;
}

export function Text({ children, size = "normal", variant = "black", weight = "normal" }: HeadingProp) {
    return <p className={`${sizeClasses[size]} ${variantClasses[variant]} ${weightClasses[weight]}`}>{children}</p>;
}

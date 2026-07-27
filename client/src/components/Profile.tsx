import { type ColorVariant, ColorClasses } from "../types/common";
import { Text } from "./Text";

export interface ProfileBaseProps {
    userFullName?: string;
    profilePicUrl?: string;
}

export interface ProfileProps extends ProfileBaseProps {
    bg?: ColorVariant;
    size: "small" | "big";
}

const profileMap = {
    small: "w-9 h-9 ",
    big: "w-24 h-24 border-4 border-white shadow-default", // Based on figma
} as const;

function Profile({ userFullName, profilePicUrl, size, bg = "primary-blue" }: ProfileProps) {
    let text: string | null = null;

    // Get the initals of first name and last name
    if (userFullName) {
        const nameList = userFullName.split(" ");
        text = `${nameList[0]?.[0]}${nameList.at(-1)?.[0]}`;
    }

    return (
        <div
            className={`${profileMap[size]} bg-cover bg-center rounded-full flex justify-center items-center`}
            style={
                profilePicUrl
                    ? { backgroundImage: `url(${profilePicUrl})` }
                    : { backgroundColor: `var(--${ColorClasses[bg]})` }
            }
        >
            {text && !profilePicUrl && (
                <Text size={size === "small" ? "small" : "bigger"} variant="white" weight="bold" align="center">
                    {text}
                </Text>
            )}
        </div>
    );
}

export default Profile;

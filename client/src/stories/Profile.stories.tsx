import type { Meta, StoryObj } from "@storybook/react-vite";

import Profile from "../components/Profile";

const meta = {
    title: "Profile",
    component: Profile,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        size: "small",
    },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ProfileTextVariantSmall: Story = {
    args: {
        size: "small",
        userFullName: "Richard Yap",
    },
};

export const ProfileTextVariantBig: Story = {
    args: {
        size: "big",
        userFullName: "Richard Yap",
    },
};

export const ProfileImageVariantSmall: Story = {
    args: {
        size: "small",
        profilePicUrl:
            "https://www.garrickadenbuie.com/blog/process-profile-picture-magick/index_files/figure-html/resized-cropped-1.png",
    },
};

export const ProfileImageVariantBig: Story = {
    args: {
        size: "big",
        profilePicUrl:
            "https://www.garrickadenbuie.com/blog/process-profile-picture-magick/index_files/figure-html/resized-cropped-1.png",
    },
};

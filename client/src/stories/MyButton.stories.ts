import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import MyButton from "../components/MyButton";

const meta = {
    title: "MyButton",
    component: MyButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        label: "Button",
        onPress: fn(),
        variant: "wide",
    },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WideButton: Story = {
    args: {
        label: "Another One",
        onPress: fn(() => {
            console.log("Test Case");
        }),
        variant: "wide",
    },
};

export const TightButton: Story = {
    args: {
        label: "New Button",
        onPress: fn(() => {
            console.log("Example function");
        }),
        variant: "tight",
    },
};

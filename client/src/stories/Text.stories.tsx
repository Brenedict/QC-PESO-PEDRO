import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Text } from "../components/Text";
import "../index.css";

const meta = {
    title: "Text",
    component: Text,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        weight: "thin",
        variant: "black",
        font: "default",
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextUse: Story = {
    args: {
        size: "giant",
        weight: "bold",
        variant: "pink",
        children: "test",
        font: "default",
    },
    render: (args) => <Text {...args}>{args.children}</Text>,
};

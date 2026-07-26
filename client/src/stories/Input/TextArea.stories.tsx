import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextAreaInput } from "../../components/Input";
import { fn } from "storybook/test";
import "../../index.css";

// Meta for TextAreaInput
const textAreaMeta = {
    title: "Input/TextArea",
    component: TextAreaInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        id: "password",
        name: "password",
        placeholder: "Enter password",
        children: "Password",
        onChange: fn(),
    },
} satisfies Meta<typeof TextAreaInput>;

export default textAreaMeta;
type Story = StoryObj<typeof textAreaMeta>;

export const TextAreaInputStory: Story = {
    args: {
        id: "comment",
        name: "comment",
        children: "Comment",
        placeholder: "Enter your comment here",
    },
};

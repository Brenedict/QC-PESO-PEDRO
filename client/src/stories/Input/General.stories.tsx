import type { Meta, StoryObj } from "@storybook/react-vite";
import { GeneralInput } from "../../components/Input";
import "../../index.css";

import { fn } from "storybook/test";

// Meta for GeneralInput
const generalInputMeta = {
    title: "Input/General",
    component: GeneralInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        id: "generalInput",
        children: "Text",
        name: "generalInput",
        placeholder: "Enter anything here",
        type: "text",
        onChange: fn(),
    },
} satisfies Meta<typeof GeneralInput>;

export default generalInputMeta;
type Story = StoryObj<typeof generalInputMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const TextInput: Story = {
    args: {
        id: "textInput",
        children: "Text",
        name: "textInput",
        placeholder: "Enter anything here",
        type: "text",
    },
};

export const NumberInput: Story = {
    args: {
        id: "numberInput",
        children: "Age",
        name: "numberInput",
        placeholder: "Input your age",
        type: "number",
    },
};

export const EmailInput: Story = {
    args: {
        id: "emailInput",
        children: "Email Address",
        name: "emailInput",
        placeholder: "Enter your email",
        type: "text",
    },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectInput } from "../../components/Input";
import "../../index.css";

// Meta for SelectInput
const passwordInputMeta = {
    title: "Input/Select",
    component: SelectInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        id: "role",
        name: "role",
        label: "Select Role",
        optionList: [
            { content: "Administrator", value: "admin" },
            { content: "Frontline Encoder", value: "frontline" },
        ],
    },
} satisfies Meta<typeof SelectInput>;

export default passwordInputMeta;
type Story = StoryObj<typeof passwordInputMeta>;

export const SelectStory: Story = {
    args: {
        id: "role",
        name: "role",
        label: "Select Role",
        optionList: [
            { content: "Administrator", value: "admin" },
            { content: "Frontline Encoder", value: "frontline" },
        ],
    },
};

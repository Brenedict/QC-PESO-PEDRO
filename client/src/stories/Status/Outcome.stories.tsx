import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../index.css";
import Status from "../../components/Status";

const meta = {
    title: "Status/Outcome",
    component: Status,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: false,
            table: {
                defaultValue: {
                    summary: '"connection"',
                },
            },
        },
        variant: {
            control: "select",
            options: ["pending", "mismatched", "success"],
        },
    },
    args: {
        type: "outcome",
        variant: "pending",
    },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
    args: {
        type: "outcome",
        variant: "pending",
    },
};

export const Mismatched: Story = {
    args: {
        type: "outcome",
        variant: "mismatched",
    },
};

export const Success: Story = {
    args: {
        type: "outcome",
        variant: "success",
    },
};

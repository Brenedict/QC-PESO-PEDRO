import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../index.css";
import Status from "../../components/Status";

const meta = {
    title: "Status/Status",
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
                    summary: '"status"',
                },
            },
        },
        variant: {
            control: "select",
            options: ["active", "inactive"],
        },
    },
    args: {
        type: "status",
        variant: "active",
    },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
    args: {
        type: "status",
        variant: "active",
    },
};

export const Inactive: Story = {
    args: {
        type: "status",
        variant: "inactive",
    },
};

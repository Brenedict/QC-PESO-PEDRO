import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../index.css";
import Status from "../../components/Status";

const meta = {
    title: "Status/Verification",
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
            options: ["pending", "approved", "needsrevision", "rejected"],
        },
    },
    args: {
        type: "verification",
        variant: "pending",
    },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
    args: {
        type: "verification",
        variant: "pending",
    },
};

export const Approved: Story = {
    args: {
        type: "verification",
        variant: "approved",
    },
};

export const NeedsRevision: Story = {
    args: {
        type: "verification",
        variant: "needsrevision",
    },
};

export const Rejected: Story = {
    args: {
        type: "verification",
        variant: "rejected",
    },
};

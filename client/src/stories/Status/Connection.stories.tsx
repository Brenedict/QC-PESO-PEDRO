import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../index.css";
import Status from "../../components/Status";

const meta = {
    title: "Status/Connection",
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
            options: ["online", "offline"],
        },
    },
    args: {
        type: "connection",
        variant: "online",
    },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
    args: {
        type: "connection",
        variant: "online",
    },
};

export const Offline: Story = {
    args: {
        type: "connection",
        variant: "offline",
    },
};

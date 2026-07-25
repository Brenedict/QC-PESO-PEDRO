import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../index.css";
import Status from "../../components/Status";

const meta = {
    title: "Status/Type",
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
            options: ["walkin", "online", "referral"],
        },
    },
    args: {
        type: "type",
        variant: "walkin",
    },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Walkin: Story = {
    args: {
        type: "type",
        variant: "walkin",
    },
};

export const Online: Story = {
    args: {
        type: "type",
        variant: "online",
    },
};

export const Referral: Story = {
    args: {
        type: "type",
        variant: "referral",
    },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Button from "../components/Button";
import "../index.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const meta = {
    title: "Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["blue", "red", "green", "navy", "white"],
        },

        size: {
            control: "radio",
            options: ["small", "normal", "large"],
        },
    },
    args: {
        children: "Default Button",
        onClick: fn(),
        variant: "blue",
        size: "normal",
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryBlue: Story = {
    args: {
        children: "Save Record",
        onClick: fn(() => console.log("Blue button clicked")),
        variant: "blue",
        size: "large",
    },
};

export const EndShiftRed: Story = {
    args: {
        children: "End Shift",
        onClick: fn(() => console.log("Red button clicked")),
        variant: "red",
        size: "small",
    },
};

export const Green: Story = {
    args: {
        children: "Download Excel",
        variant: "green",
        size: "normal",
    },
};

export const DarkNavy: Story = {
    args: {
        children: "Download PDF",
        variant: "navy",
        size: "normal",
    },
};

export const OutlineWhite: Story = {
    args: {
        children: "Cancel",
        variant: "white",
        size: "small",
    },
};

export const OutlineWhiteLeftIcon: Story = {
    args: {
        children: "Cancel",
        variant: "white",
        size: "small",
        className: "text-black",
        leftIcon: { icon: AccountCircleOutlinedIcon, variant: "black", size: "medium" },
    },
};

export const OutlineWhiteRightIcon: Story = {
    args: {
        children: "Cancel",
        variant: "white",
        size: "small",
        className: "text-black",
        rightIcon: { icon: AccountCircleOutlinedIcon, variant: "black", size: "bigMedium" },
    },
};

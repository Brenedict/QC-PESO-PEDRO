import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

import { ColorClasses, type ColorVariant } from "../types/common";
import Icon from "../components/Icon";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import "../index.css";

const meta = {
    title: "Icon",
    component: Icon,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        variant: "white",
        icon: AccountCircleOutlinedIcon,
        size: "giant",
        bg_variant: "primary-blue",
        bg_padding: "big",
        bg_type: "normal",
    },

    argTypes: {
        icon: {
            table: {
                disable: true,
            },
        },
        bg: {
            table: {
                disable: true,
            },
        },
        variant: {
            control: "select",
            options: Object.keys(ColorClasses),
        },
        bg_variant: {
            control: "select",
            options: Object.keys(ColorClasses),
        },
        bg_padding: {
            control: "select",
            options: ["small", "big"],
        },
        bg_type: {
            control: "select",
            options: ["normal", "circle"],
        },
    },

    render: (args) => {
        const { bg_variant, bg_padding, bg_type, ...restArgs } = args;
        const bg = {
            variant: bg_variant,
            padding: bg_padding,
            type: bg_type,
        };
        return <Icon {...restArgs} bg={bg} />;
    },
} satisfies Meta<
    Omit<ComponentProps<typeof Icon>, "bg"> & {
        bg: undefined;
        bg_variant: ColorVariant;
        bg_padding: "small" | "big";
        bg_type: "normal" | "circle";
    }
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconPreview: Story = {
    args: {
        variant: "white",
        icon: AccountCircleOutlinedIcon,
        size: "bigger",
        bg: undefined,
        bg_variant: "primary-blue",
        bg_padding: "big",
        bg_type: "normal",
    },
};

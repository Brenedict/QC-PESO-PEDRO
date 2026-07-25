import type { Meta, StoryObj } from "@storybook/react-vite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { Text } from "../components/Text";
import "../index.css";

const meta = {
    title: "Text",
    component: Text,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        weight: "thin",
        variant: "black",
        font: "default",
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextUse: Story = {
    args: {
        size: "giant",
        weight: "bold",
        variant: "pink",
        children: "test",
        font: "default",
    },
    render: (args) => <Text {...args}>{args.children}</Text>,
};

export const TextGuide: Story = {
    render: () => (
        <div className="flex flex-col gap-1">
            <Text size="giant">Giant Text 2.25rem</Text>
            <Text size="bigger">Bigger Text 1.875rem</Text>
            <Text size="big">Big Text 1.5rem</Text>
            <Text size="medium">Medium Text 1.125rem</Text>
            <Text size="normal">Normal Text 1rem</Text>
            <Text size="description">Description 0.875rem</Text>
            <Text size="small">SMALL DESCRIPTION 0.75REM</Text>
            <Text size="smaller">SMALLER DESCRIPTION 0.625REM</Text>
        </div>
    ),
};

export const TextLeftIcon: Story = {
    args: {
        size: "bigger",
        weight: "bold",
        variant: "pink",
        children: "test",
        font: "default",
        svg: {
            gap: "medium",
            icon: AccountBoxIcon,
            position: "left",
            size: "giant",
        },
    },
    render: (args) => <Text {...args}>{args.children}</Text>,
};

export const TextRightIcon: Story = {
    args: {
        size: "bigger",
        weight: "bold",
        variant: "pink",
        children: "test",
        font: "default",
        svg: {
            gap: "medium",
            icon: AccountBoxIcon,
            position: "right",
            size: "giant",
        },
    },
    render: (args) => <Text {...args}>{args.children}</Text>,
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import PageHeader from "../components/PageHeader.tsx";
import "../index.css";

const meta = {
    title: "Page Header",
    component: PageHeader,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        primaryText: "Header Text",
        secondaryText: "Add some description text here!",
    },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageHeaderStory: Story = {
    args: {
        primaryText: "Header Text",
        secondaryText: "Add some description text here!",
    },
};

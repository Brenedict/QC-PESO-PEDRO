import type { Meta, StoryObj } from "@storybook/react-vite";

import { RecentActivity } from "../components/RecentActivity";

import { recentActivity } from "../data/recentActivity";

import "../index.css";

const meta = {
    title: "RecentActivity",
    component: RecentActivity,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof RecentActivity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: recentActivity,
    },
    render: (args) => (
        <div className="w-[500px]">
            <RecentActivity items={args.items} onViewAll={() => alert("View all clicked")} />
        </div>
    ),
};

export const Empty: Story = {
    args: {
        items: [],
    },
    render: () => (
        <div className="w-[500px]">
            <RecentActivity items={[]} />
        </div>
    ),
};

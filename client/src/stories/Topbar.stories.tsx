import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import Topbar from "../components/Topbar";
import "../index.css";

const meta = {
    title: "Topbar",
    component: Topbar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        hasNotif: true,
        userFullName: "Juan Cruz",
        profilePicUrl: undefined,
        onNotifClick: fn(),
        onSearchChange: fn(),
        roleType: "admin",
        status: "online",
    },
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TopBarAdmin: Story = {
    argTypes: {
        status: {
            control: "radio",
            options: ["online", "offline"],
        },
    },
    args: {
        hasNotif: true,
        userFullName: "Juan Cruz",
        profilePicUrl: undefined,
        onNotifClick: fn(),
        onSearchChange: fn(),
        roleType: "admin",
        status: "online",
    },

    render: (args) => (
        <div className="w-400">
            <Topbar {...args} />
        </div>
    ),
};

export const TopBarFronline: Story = {
    args: {
        hasNotif: true,
        userFullName: "Juan Cruz",
        profilePicUrl: undefined,
        onNotifClick: fn(),
        onSearchChange: fn(),
        roleType: "frontline",
        status: "online",
    },

    render: (args) => (
        <div className="w-400">
            <Topbar {...args} />
        </div>
    ),
};

export const TopBarOffline: Story = {
    args: {
        hasNotif: true,
        userFullName: "Juan Cruz",
        profilePicUrl: undefined,
        onNotifClick: fn(),
        onSearchChange: fn(),
        roleType: "frontline",
        status: "offline",
    },

    render: (args) => (
        <div className="w-400">
            <Topbar {...args} />
        </div>
    ),
};

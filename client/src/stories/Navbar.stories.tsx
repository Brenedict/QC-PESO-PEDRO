import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavBar } from "../components/Navbar";
import "../index.css";
import { MemoryRouter } from "react-router";

// Meta for NavBar
const navBarMeta = {
    title: "NavBar",
    component: NavBar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        userType: "frontline",
    },
} satisfies Meta<typeof NavBar>;

export default navBarMeta;
type Story = StoryObj<typeof navBarMeta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const NavigationBarFrontline: Story = {
    args: {
        userType: "frontline",
    },
    render: (args) => (
        <MemoryRouter>
            <NavBar {...args} />
        </MemoryRouter>
    ),
};

export const NavigationBarAdmin: Story = {
    args: {
        userType: "admin",
    },
    render: (args) => (
        <MemoryRouter>
            <NavBar {...args} />
        </MemoryRouter>
    ),
};

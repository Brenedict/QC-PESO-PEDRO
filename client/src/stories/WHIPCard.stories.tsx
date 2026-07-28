import type { Meta, StoryObj } from "@storybook/react";
import { WHIPCard } from "../components/WHIPCard";

const meta: Meta<typeof WHIPCard> = {
    title: "Dashboard/WHIP Card",
    component: WHIPCard,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof WHIPCard>;

export const Default: Story = {
    args: {
        title: "WHIP",
        totalparticipants: 112,
        male: 62,
        female: 50,
    },
};
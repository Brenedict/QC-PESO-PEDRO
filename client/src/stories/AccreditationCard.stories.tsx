import type { Meta, StoryObj } from "@storybook/react";
import { AccreditationCard } from "../components/AccreditationCard";
import "../index.css";

const meta: Meta<typeof AccreditationCard> = {
    title: "Dashboard/AccreditationCard",
    component: AccreditationCard,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AccreditationCard>;

export const Default: Story = {
    args: {
        title: "Accreditation",
        total: 24,
        newCount: 14,
        renewalCount: 10,
    },
};


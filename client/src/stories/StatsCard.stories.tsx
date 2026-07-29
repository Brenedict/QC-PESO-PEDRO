import type { Meta, StoryObj } from "@storybook/react";
import { StatsCard } from "../components/StatsCard";
import "../index.css";

const meta: Meta<typeof StatsCard> = {
    title: "Dashboard/Stats Card",
    component: StatsCard,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatsCard>;

export const TotalTransactions: Story = {
    args: {
        title: "Total Transactions",
        total: 142,
        male: 82,
        female: 60,
        previous: 20,
    },
};

export const WalkIns: Story = {
    args: {
        title: "Walk Ins",
        total: 48,
        male: 26,
        female: 22,
        previous: 30,
    },
};

export const OnlineReferrals: Story = {
    args: {
        title: "Online Referrals",
        total: 31,
        male: 18,
        female: 13,
        previous: 10,
    },
};

export const InHouseReferrals: Story = {
    args: {
        title: "In-house Referrals",
        total: 17,
        male: 8,
        female: 9,
        previous: 10,
    },
};

export const OtherInquiries: Story = {
    args: {
        title: "Other Inquiries",
        total: 12,
        male: 6,
        female: 6,
        previous: 10,
    },
};

export const FirstTimeJobSeekers: Story = {
    args: {
        title: "First Time Job Seekers",
        total: 41,
        male: 19,
        female: 22,
        previous: 10,
    },
};

export const PWD: Story = {
    args: {
        title: "PWD",
        total: 9,
        male: 5,
        female: 4,
        previous: 10,
    },
};

export const SeniorCitizens: Story = {
    args: {
        title: "Senior Citizens",
        total: 11,
        male: 4,
        female: 7,
        previous: 10,
    },
};

export const SuccessfulReferrals: Story = {
    args: {
        title: "Successful Referrals",
        total: 84,
        male: 45,
        female: 39,
        previous: 10,
    },
};

export const PendingApplications: Story = {
    args: {
        title: "Pending Applications",
        total: 12,
        male: 7,
        female: 5,
        previous: 10,
    },
};

export const MismatchedSkills: Story = {
    args: {
        title: "Mismatched Skills",
        total: 6,
        male: 4,
        female: 2,
        previous: 10,
    },
};


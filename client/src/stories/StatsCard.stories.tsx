import type { Meta, StoryObj } from "@storybook/react";
import { StatsCard } from "../components/StatsCard";

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
        change: "↗ +12% vs Yesterday",
        isPositive: true,
    },
};

export const WalkIns: Story = {
    args: {
        title: "Walk Ins",
        total: 48,
        male: 26,
        female: 22,
        change: "↗ +5% vs Yesterday",
        isPositive: true,
    },
};

export const OnlineReferrals: Story = {
    args: {
        title: "Online Referrals",
        total: 31,
        male: 18,
        female: 13,
        change: "",
        isPositive: true,
    },
};

export const InHouseReferrals: Story = {
    args: {
        title: "In-house Referrals",
        total: 17,
        male: 8,
        female: 9,
        change: "",
        isPositive: true,
    },
};

export const OtherInquiries: Story = {
    args: {
        title: "Other Inquiries",
        total: 12,
        male: 6,
        female: 6,
        change: "",
        isPositive: true,
    },
};

export const FirstTimeJobSeekers: Story = {
    args: {
        title: "First Time Job Seekers",
        total: 41,
        male: 19,
        female: 22,
        change: "↘ -2% vs Yesterday",
        isPositive: false,
    },
};

export const PWD: Story = {
    args: {
        title: "PWD",
        total: 9,
        male: 5,
        female: 4,
        change: "",
        isPositive: true,
    },
};

export const SeniorCitizens: Story = {
    args: {
        title: "Senior Citizens",
        total: 11,
        male: 4,
        female: 7,
        change: "",
        isPositive: true,
    },
};

export const SuccessfulReferrals: Story = {
    args: {
        title: "Successful Referrals",
        total: 84,
        male: 45,
        female: 39,
        change: "↗ +8% vs Yesterday",
        isPositive: true,
    },
};

export const PendingApplications: Story = {
    args: {
        title: "Pending Applications",
        total: 12,
        male: 7,
        female: 5,
        change: "",
        isPositive: true,
    },
};

export const MismatchedSkills: Story = {
    args: {
        title: "Mismatched Skills",
        total: 6,
        male: 4,
        female: 2,
        change: "",
        isPositive: true,
    },
};
import type { Meta, StoryObj } from "@storybook/react";
import { JobFairParticipants } from "../components/JobFairParticipants";

const meta: Meta<typeof JobFairParticipants> = {
  title: "Dashboard/Job Fair Participants",
  component: JobFairParticipants,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof JobFairParticipants>;

export const Default: Story = {
  args: {
    title: "Job Fair Participants",
    registered: 160,
    registeredMale: 88,
    registeredFemale: 72,
    hired: 58,
    hiredMale: 34,
    hiredFemale: 24,
  },
};
import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import ChecklistItem from "../components/ChecklistItem";
import { Text } from "../components/Text";
import Button from "../components/Button";

import "../index.css";

const meta = {
    title: "ChecklistItem",
    component: ChecklistItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        children: "default",
        name: "default",
        variant: "normal",
    },
} satisfies Meta<typeof ChecklistItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChecklistItemUse: Story = {
    args: {
        name: "consent",
        children: "I consent to this",
        variant: "normal",
    },
    render: (args) => <ChecklistItem {...args}>{args.children}</ChecklistItem>,
};

export const MultiChecklistItemUse: Story = {
    render: () => (
        <div className="flex gap-3">
            <Text size="description" variant="black" weight="normal">
                Allergies:
            </Text>
            <ChecklistItem name="nutAllergy" variant="normal">
                Nuts
            </ChecklistItem>
            <ChecklistItem name="chocoAllergy" variant="normal">
                Chocolate
            </ChecklistItem>
        </div>
    ),
};

export const FormUsage: Story = {
    parameters: {
        docs: {
            description: {
                story: "Try ticking the checkboxes and hit the save button. Go to the console to see the data displayed. This merely showcases that the checkboxes data can be obtain from the component. However you still need another checking to send the data for unticked checkboxes.",
            },
        },
    },
    render: () => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = Object.fromEntries(formData.entries());

                // Currently this only displays ticked checkboxes
                console.log(data);
            }}
        >
            <div className="flex gap-2">
                <ChecklistItem variant="stylized" name="firstTimeJobSeeker">
                    First Time Job Seeker
                </ChecklistItem>
                <ChecklistItem variant="stylized" name="personWithDisability">
                    Person With Disability (PWD)
                </ChecklistItem>
                <ChecklistItem variant="stylized" name="seniorCitizen">
                    Senior Citizen
                </ChecklistItem>
                <ChecklistItem variant="stylized" name="youngWorker">
                    Young Worker
                </ChecklistItem>
                <ChecklistItem variant="stylized" name="student">
                    Student
                </ChecklistItem>
            </div>
            <Button className="my-3" size="small" variant="blue" type="submit">
                Save
            </Button>
        </form>
    ),
};

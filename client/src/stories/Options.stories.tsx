import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { ChecklistItem } from "../components/Options";
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
        type: "checkbox",
        stylized: false,
    },
} satisfies Meta<typeof ChecklistItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChecklistItemUse: Story = {
    args: {
        name: "consent",
        children: "I consent to this",
        stylized: false,
    },
    render: (args) => <ChecklistItem {...args}>{args.children}</ChecklistItem>,
};

export const MultiChecklistItemUse: Story = {
    render: () => (
        <div className="flex gap-3">
            <Text size="description" variant="black" weight="normal">
                Allergies:
            </Text>
            <ChecklistItem name="nutAllergy" type="checkbox" stylized={false}>
                Nuts
            </ChecklistItem>
            <ChecklistItem name="chocoAllergy" type="checkbox" stylized={false}>
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
                <ChecklistItem type="checkbox" stylized={true} name="firstTimeJobSeeker">
                    First Time Job Seeker
                </ChecklistItem>
                <ChecklistItem type="checkbox" stylized={true} name="personWithDisability">
                    Person With Disability (PWD)
                </ChecklistItem>
                <ChecklistItem type="checkbox" stylized={true} name="seniorCitizen">
                    Senior Citizen
                </ChecklistItem>
                <ChecklistItem type="checkbox" stylized={true} name="youngWorker">
                    Young Worker
                </ChecklistItem>
                <ChecklistItem type="checkbox" stylized={true} name="student">
                    Student
                </ChecklistItem>
            </div>
            <Button className="my-3" size="small" variant="blue" type="submit">
                Save
            </Button>
        </form>
    ),
};

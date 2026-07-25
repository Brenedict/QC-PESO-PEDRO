import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import ChoiceItem from "../components/ChoiceItem";
import { Text } from "../components/Text";
import Button from "../components/Button";

import { useState } from "react";

import "../index.css";

const meta = {
    title: "ChoiceItem",
    component: ChoiceItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        children: "default",
        inputVariant: "checkbox",
        stylized: false,
        name: "default",
        defaultChecked: false,
    },
} satisfies Meta<typeof ChoiceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChoiceItemCheckbox: Story = {
    args: {
        name: "consent",
        children: "I consent to this",
        stylized: false,
        inputVariant: "checkbox",
    },
    render: (args) => <ChoiceItem {...args}>{args.children}</ChoiceItem>,
};

export const MultiChoiceItemUse: Story = {
    render: () => (
        <div className="flex gap-3">
            <Text size="description" variant="black" weight="normal">
                Allergies:
            </Text>
            <ChoiceItem name="nutAllergy" inputVariant="checkbox" stylized={false}>
                Nuts
            </ChoiceItem>
            <ChoiceItem name="chocoAllergy" inputVariant="checkbox" stylized={false}>
                Chocolate
            </ChoiceItem>
        </div>
    ),
};

export const ChoiceItemRadio: Story = {
    parameters: {
        docs: {
            description: {
                story: "When using the `inputVariant` for radio, make sure to assign each radio componenent a similar `name` attribute to group them as one. You can also assign one of them to be the default `checked` item by assigning it the attribute `defaultChecked`",
            },
        },
    },
    args: {
        stylized: false,
        inputVariant: "radio",
    },
    render: (args) => (
        <div>
            <Text size="description" variant="black" weight="normal">
                Feeling:
            </Text>
            <div className="flex gap-5">
                <ChoiceItem {...args} value="Happy" id="happy" name="feel" defaultChecked>
                    Happy
                </ChoiceItem>
                <ChoiceItem {...args} value="Sad" id="sad" name="feel">
                    Sad
                </ChoiceItem>
                <ChoiceItem {...args} value="Angry" id="angry" name="feel">
                    Angry
                </ChoiceItem>
            </div>

            <Text size="description" variant="black" weight="normal">
                Sex:
            </Text>
            <div className="flex gap-5">
                <ChoiceItem {...args} value="Male" id="male" name="sexOrientation" defaultChecked>
                    Male
                </ChoiceItem>
                <ChoiceItem {...args} value="Female" id="female" name="sexOrientation">
                    Female
                </ChoiceItem>
            </div>
        </div>
    ),
};

export const FormUsage: Story = {
    parameters: {
        docs: {
            description: {
                story: "Try ticking the checkboxes and hit the save button. Go to the console to see the data displayed. This merely showcases that the checkboxes/radio data can be obtain from the component. However you still need another checking to send the data for unticked checkboxes.",
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
                <ChoiceItem inputVariant="checkbox" stylized={true} name="firstTimeJobSeeker" value="true">
                    First Time Job Seeker
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="personWithDisability" value="true">
                    Person With Disability (PWD)
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="seniorCitizen" value="true">
                    Senior Citizen
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="youngWorker" value="true">
                    Young Worker
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="student" value="true">
                    Student
                </ChoiceItem>
            </div>
            <div className="flex gap-2">
                <ChoiceItem
                    inputVariant="radio"
                    stylized={true}
                    value="Male"
                    id="male"
                    name="sexOrientation"
                    defaultChecked
                >
                    Male
                </ChoiceItem>
                <ChoiceItem inputVariant="radio" stylized={true} value="Female" id="female" name="sexOrientation">
                    Female
                </ChoiceItem>
            </div>
            <Button className="my-3" size="small" variant="blue" type="submit">
                Save
            </Button>
        </form>
    ),
};

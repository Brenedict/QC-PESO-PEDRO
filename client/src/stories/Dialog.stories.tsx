import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dialog } from "../components/Dialog";
import { Text } from "../components/Text";
import Button from "../components/Button";

import "../index.css";

const meta = {
    title: "Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogWithNoHeaderAndFooter: Story = {
    parameters: {
        docs: {
            description: {
                story: "You can toggle the 'x' button on the `<Dialog.Header>`. By default it is active, disable it with ``<Dialog.Header toggleRightIcon={false}>`. All configurations to the `Card` component applies to this `Dialog` component (i.e. variant, bordered, dropShadow, className). To properly use the dialog component, you must add it to a page (does not matter what position since it is in a `fixed` position).",
            },
        },
    },
    render: () => (
        <>
            <section>
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae rerum doloribus hic eaque
                    totam, quam quibusdam sed voluptatum et magnam consectetur sint praesentium iste asperiores culpa.
                    Esse ipsam recusandae nihil.
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae rerum doloribus hic eaque
                    totam, quam quibusdam sed voluptatum et magnam consectetur sint praesentium iste asperiores culpa.
                    Esse ipsam recusandae nihil.
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae rerum doloribus hic eaque
                    totam, quam quibusdam sed voluptatum et magnam consectetur sint praesentium iste asperiores culpa.
                    Esse ipsam recusandae nihil.
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae rerum doloribus hic eaque
                    totam, quam quibusdam sed voluptatum et magnam consectetur sint praesentium iste asperiores culpa.
                    Esse ipsam recusandae nihil.
                </h1>
            </section>
            <Dialog dropShadow={true}>
                <Dialog.Header
                    toggleRightIcon={true}
                    onRightAction={() => {
                        console.log("This is a test");
                    }}
                    variant="grayish-blue-opaque"
                >
                    <Text weight="bold">Edit Transaction: TX-260716-001</Text>
                </Dialog.Header>
                <Dialog.Body>
                    <Text>This is a Dialog component using a text component</Text>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button size="normal">Save Changes</Button>
                </Dialog.Footer>
            </Dialog>
        </>
    ),
};

// General Imports
import { Form, redirect, useParams } from "react-router";

// Hooks
import { ROUTES, useNavigateDefault, type transactionRootPage } from "../../hooks/reroute";

// Components
import { Card } from "../Card";
import { Dialog } from "..//Dialog";
import { Text } from "../Text";
import ChoiceItem from "../ChoiceItem";
import Icon from "../Icon";
import { GeneralInput, SelectInput, TextAreaInput } from "../Input";
import Button from "../Button";

// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Test Data
import { decode } from "../../utils/hashids";

export function PopupViewEditTransaction({ root = "history" }: { root: transactionRootPage }) {
    const navigate = useNavigateDefault();
    const { transactionId } = useParams();

    if (!transactionId) return null;

    const decodedId = decode(transactionId);

    // Determines reroute on cancel between transactionEntry & transactionHistory page
    const returnPageOnClose = root == "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(returnPageOnClose, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(returnPageOnClose, true)}>
                <Text weight="bold">Edit Transaction: {decodedId}</Text>
            </Dialog.Header>
            <Dialog.Body>
                <Form method="post" id="transactionsFormViewEdit" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={transactionId}></GeneralInput>
                    <FormRow1 />
                    <FormRow2 />
                    <FormRow3 />
                    <FormRow4 />
                </Form>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <Button variant="white" size="small" onClick={() => navigate(returnPageOnClose, true)}>
                    Cancel
                </Button>
                <Button size="small" type="submit" form="transactionsFormViewEdit">
                    Save Changes
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupDeleteTransaction({ root = "history" }: { root: transactionRootPage }) {
    const navigate = useNavigateDefault();
    const { transactionId } = useParams();

    if (!transactionId) return null;

    const decodedId = decode(transactionId);

    // Determines reroute on cancel between transactionEntry & transactionHistory page
    const returnPageOnClose = root == "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(returnPageOnClose, true)}>
            <Dialog.Body className="p-6!">
                <Form method="post" id="transactionsFormViewEdit" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={transactionId}></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center gap-6 max-w-md">
                    <div className="flex justify-center">
                        <Icon
                            icon={DeleteOutlineOutlinedIcon}
                            size="giant"
                            variant="red"
                            bg={{
                                padding: "big",
                                type: "circle",
                                variant: "red-opaque",
                            }}
                        ></Icon>
                    </div>
                    <Text size="medium" weight="bold" align="center">
                        Delete Transaction?
                    </Text>
                    <div>
                        <Text variant="grayish-blue" align="center">
                            Are you sure you want to delete transaction
                        </Text>
                        <Text variant="grayish-blue" align="center">
                            <span className="font-bold text-black">{decodedId}</span>?
                        </Text>
                    </div>
                    <div className="flex justify-center">
                        <Card className="w-fit border-red" dropShadow={false}>
                            <Card.Body variant="red-opaque" className="p-3!">
                                <Text variant="red">This action cannot be undone and will be logged.</Text>
                            </Card.Body>
                        </Card>
                    </div>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <Button variant="white-black" size="small" onClick={() => navigate(returnPageOnClose, true)}>
                    Cancel
                </Button>
                <Button variant="red" size="small" type="submit" form="transactionsFormViewEdit">
                    Confirm Delete
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}

function FormRow1() {
    return (
        <section className="flex gap-6">
            <div className="w-2/4">
                <GeneralInput
                    name="name"
                    type="text"
                    placeholder="Last Name, First Name"
                    label="Applicant Name"
                ></GeneralInput>
            </div>
            <div className="w-2/4 flex gap-6">
                <GeneralInput name="date" type="date" label="Date"></GeneralInput>

                <GeneralInput name="time" type="time" label="Time"></GeneralInput>
            </div>
        </section>
    );
}

function FormRow2() {
    return (
        <section className="flex gap-6">
            <div className="w-1/3">
                <SelectInput
                    name="transactionType"
                    label="Transaction Type"
                    optionList={[
                        { content: "Walk-In Referral", value: "walkinReferral" },
                        { content: "Online Referral", value: "onlineReferral" },
                        { content: "Inhouse Recruitment", value: "inhouseRecruitment" },
                    ]}
                ></SelectInput>
            </div>

            <div className="w-1/3 flex flex-wrap content-start gap-x-6 gap-y-3">
                <div className="w-full bg">
                    <Text size="description" variant="dark-blue" weight="medium">
                        Gender
                    </Text>
                </div>
                <ChoiceItem inputVariant="radio" name="gender" value="male" defaultChecked>
                    Male
                </ChoiceItem>
                <ChoiceItem inputVariant="radio" name="gender" value="female">
                    Female
                </ChoiceItem>
            </div>
            <div className="w-1/3">
                <SelectInput
                    name="transactionOutcome"
                    label="Transaction Outcome"
                    optionList={[
                        { content: "Pending", value: "pending" },
                        { content: "Mismatched", value: "mismatched" },
                        { content: "Success", value: "success" },
                    ]}
                ></SelectInput>
            </div>
        </section>
    );
}

function FormRow3() {
    return (
        <section className="flex flex-col gap-1">
            <Text size="description" variant="dark-blue" weight="medium">
                Applicant Classification
            </Text>
            <div className="flex flex-wrap gap-3">
                <ChoiceItem inputVariant="checkbox" stylized={true} name="firstTimeJobSeeker">
                    First Time Job Seeker
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="personWithDisability">
                    Person With Disability (PWD)
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="seniorCitizen">
                    Senior Citizen
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="youngWorker">
                    Young Worker
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name="student">
                    Student
                </ChoiceItem>
            </div>
        </section>
    );
}

function FormRow4() {
    return (
        <section>
            <TextAreaInput
                id="remarls"
                label="Remarks"
                name="remarks"
                placeholder="Optional notes regarding the transaction..."
            />
        </section>
    );
}

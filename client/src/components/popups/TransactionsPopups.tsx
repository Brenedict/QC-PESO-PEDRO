import { Form, useParams } from "react-router";

import { Dialog } from "..//Dialog";
import { Text } from "../Text";
import Button from "../Button";
import ChoiceItem from "../ChoiceItem";
import { GeneralInput, SelectInput, TextAreaInput } from "../Input";
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";

export function PopupDeleteTransaction() {
    const useNavigate = useNavigateDefault();
    const { transactionId } = useParams();

    return (
        <Dialog dropShadow={true} onClose={() => useNavigate(ROUTES.history.root)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => useNavigate(ROUTES.history.root)}>
                <Text weight="bold">Edit Transaction: {transactionId}</Text>
            </Dialog.Header>
            <Dialog.Body>
                <Form method="post" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput
                        hidden
                        name="id"
                        type="text"
                        placeholder=""
                        defaultValue={transactionId}
                    ></GeneralInput>
                    <FormRow1 />
                    <FormRow2 />
                    <FormRow3 />
                    <FormRow4 />
                    <button type="submit" className="bg-red-300">
                        SUBMIT
                    </button>
                </Form>
            </Dialog.Body>
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
                <GeneralInput name="date" type="date" placeholder="" label="Date"></GeneralInput>

                <GeneralInput name="time" type="time" placeholder="" label="Time"></GeneralInput>
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
                        { content: "Walk-In Referral", value: "walkin" },
                        { content: "Online Referral", value: "online" },
                        { content: "Inhouse Recruitment", value: "inhouse" },
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

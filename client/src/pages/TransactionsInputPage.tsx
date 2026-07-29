import { Text } from "../components/Text";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import { GeneralInput, SelectInput, TextAreaInput } from "../components/Input";
import { ActionButtons, ColumnText, DateTime } from "../components/TableCells";
import ChoiceItem from "../components/ChoiceItem";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { Form } from "react-router";

import { transactions } from "../data/transactions";
import Status from "../components/Status";

interface FormProps {
    onSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

function FormRow1() {
    return (
        <section className="flex gap-6">
            <div className="w-2/4">
                <GeneralInput type="text" placeholder="Last Name, First Name" label="Applicant Name"></GeneralInput>
            </div>
            <div className="w-2/4 flex gap-6">
                <GeneralInput type="date" placeholder="" label="Date"></GeneralInput>

                <GeneralInput type="time" placeholder="" label="Time"></GeneralInput>
            </div>
        </section>
    );
}

function FormRow2() {
    return (
        <section className="flex gap-6">
            <div className="w-1/3">
                <SelectInput
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
                <ChoiceItem inputVariant="radio" name="gender" value="male">
                    Male
                </ChoiceItem>
                <ChoiceItem inputVariant="radio" name="gender" value="female">
                    Female
                </ChoiceItem>
            </div>
            <div className="w-1/3">
                <SelectInput
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

//  Profile picture, name, role, and change password button
function TransactionsInputForm({ onSubmit }: FormProps) {
    return (
        <Card className="w-full flex flex-col h-fit">
            <Form onSubmit={onSubmit}>
                <Card.Body className="flex flex-col gap-6">
                    <FormRow1 />
                    <FormRow2 />
                    <FormRow3 />
                    <FormRow4 />
                </Card.Body>

                <Card.Footer variant="white" bordered={true} className="flex gap-3 justify-end">
                    <Button
                        variant="white"
                        size="normal"
                        className="text-sm font-semibold text-black"
                        leftIcon={{ icon: CloseRoundedIcon, size: "normal", variant: "black" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="navy"
                        size="normal"
                        className="text-sm font-light"
                        leftIcon={{ icon: AddCircleOutlineRoundedIcon, size: "normal", variant: "white" }}
                    >
                        Save & Add Another
                    </Button>
                    <Button
                        variant="blue"
                        size="normal"
                        className="text-sm font-semibold"
                        leftIcon={{ icon: SaveOutlinedIcon, size: "normal", variant: "white" }}
                    >
                        Save Record
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
}

function TransactionsLedger() {
    return (
        <Card>
            <Card.Header variant="white">
                <Text size="normal" weight="bold">
                    Today's Ledger
                </Text>
            </Card.Header>
            <Table noCardStyle={true} pagination={6} onFilterSubmit={() => {}}>
                {/* Header row */}
                <Table.Row>
                    <Table.Header text="Date/Time" />
                    <Table.Header text="Applicant Name" />
                    <Table.Header text="Type" />
                    <Table.Header text="Outcome" />
                    <Table.Header text="Actions" />
                </Table.Row>

                {/* Data rows */}
                {transactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                        <Table.Data>
                            <DateTime dateTime={transaction.dateTime} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{transaction.applicant}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <Status type="type" variant={transaction.type} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="outcome" variant={transaction.outcome} />
                        </Table.Data>
                        <Table.Data>
                            <ActionButtons transactionId={transaction.id} />
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>
        </Card>
    );
}

function TransactionsInputPagePage({ onSubmit }: FormProps) {
    return (
        <>
            <PageHeader
                primaryText="Regular Transactions"
                secondaryText="Record new daily transactions and activities."
            ></PageHeader>
            <div className="flex flex-col gap-6">
                <TransactionsInputForm onSubmit={onSubmit} />
                <TransactionsLedger />
            </div>
        </>
    );
}

export default TransactionsInputPagePage;

// General Imports
import { Form, Outlet } from "react-router";

// Components
import { Text } from "../components/Text";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import { GeneralInput, SelectInput, TextAreaInput } from "../components/Input";
import { ActionButtons, ColumnText, DateTime } from "../components/TableCells";
import ChoiceItem from "../components/ChoiceItem";
import Status from "../components/Status";

// Icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

// Sample Data
import { transactions } from "../data/transactions";

// Hooks
import { useSearchParamsTable } from "../hooks/table";
import { useNavigateDefault, ROUTES } from "../hooks/reroute";
import { Demographic } from "@qcpesopedro/shared/prisma/client";

export function FormRow1() {
    return (
        <section className="grid grid-cols-5 gap-6">
            <div className="col-span-3 flex gap-6">
                <GeneralInput name="applicantFirstName" type="text" placeholder="First Name" label="First Name" />
                <GeneralInput name="applicantLastName" type="text" placeholder="Last Name" label="Last Name" />
            </div>
            <div className="col-span-2 flex gap-6">
                <GeneralInput name="date" type="date" placeholder="" label="Date" />

                <GeneralInput name="time" type="time" placeholder="" label="Time" />
            </div>
        </section>
    );
}

export function FormRow2() {
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
                        Sex
                    </Text>
                </div>
                <ChoiceItem inputVariant="radio" name="applicantSex" value="male" defaultChecked>
                    Male
                </ChoiceItem>
                <ChoiceItem inputVariant="radio" name="applicantSex" value="female">
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

export function FormRow3() {
    return (
        <section className="flex flex-col gap-1">
            <Text size="description" variant="dark-blue" weight="medium">
                Applicant Classification
            </Text>
            <div className="flex flex-wrap gap-3">
                <ChoiceItem inputVariant="checkbox" stylized={true} name={Demographic.FIRST_TIME_JOB_SEEKER}>
                    First Time Job Seeker
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name={Demographic.PERSONS_WITH_DISABILITY}>
                    Person With Disability (PWD)
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name={Demographic.SENIOR_CITIZEN}>
                    Senior Citizen
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name={Demographic.YOUNG_WORKER}>
                    Young Worker
                </ChoiceItem>
                <ChoiceItem inputVariant="checkbox" stylized={true} name={Demographic.WORK_IMMERSION_INTERNSHIP}>
                    Work Immersion/Internship
                </ChoiceItem>
            </div>
        </section>
    );
}

export function FormRow4() {
    return (
        <section>
            <TextAreaInput
                id="remarks"
                label="Remarks"
                name="remarks"
                placeholder="Optional notes regarding the transaction..."
            />
        </section>
    );
}

//  Profile picture, name, role, and change password button
function TransactionsInputForm() {
    return (
        <Card className="w-full flex flex-col h-fit">
            <Form method="post">
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
    const navigate = useNavigateDefault();
    const { page, handleSetPage } = useSearchParamsTable();

    const handleEdit = (id: string) => () => {
        navigate(ROUTES.applicantForm.edit(id), true);
    };

    const handleDelete = (id: string) => () => {
        navigate(ROUTES.applicantForm.delete(id), true);
    };

    return (
        <Card>
            <Card.Header variant="white">
                <Text size="normal" weight="bold">
                    Today's Ledger
                </Text>
            </Card.Header>
            <Table
                noCardStyle={true}
                pagination={{ handleSetPage, currentPage: page, items: 6 }}
                handleFilterSubmit={() => {}}
            >
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
                            <ActionButtons
                                id={transaction.id}
                                actions={[
                                    {
                                        color: "black",
                                        icon: BorderColorOutlinedIcon,
                                        handleClick: handleEdit,
                                        text: "Edit",
                                    },
                                    {
                                        color: "red",
                                        icon: PersonRemoveOutlinedIcon,
                                        handleClick: handleDelete,
                                        text: "Delete",
                                    },
                                ]}
                            />
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>
        </Card>
    );
}

function TransactionsInputPagePage() {
    return (
        <>
            <PageHeader
                primaryText="Regular Transactions"
                secondaryText="Record new daily transactions and activities."
            ></PageHeader>
            <div className="flex flex-col gap-6">
                <TransactionsInputForm />
                <TransactionsLedger />
            </div>

            {/* Popup Uses */}
            <Outlet />
        </>
    );
}

export default TransactionsInputPagePage;

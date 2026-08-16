// General Imports
import { Form, Outlet, useLoaderData, useActionData } from "react-router";
import { useEffect, useRef, useState } from "react";

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

// Hooks
import { useSearchParamsTable } from "../hooks/table";
import { useNavigateDefault, ROUTES } from "../hooks/reroute";
import { Demographic, TransactionType, Sex, type Transaction, Outcome } from "@qcpesopedro/shared/prisma/browser";
import { TransactionScalarFieldEnum } from "@qcpesopedro/shared/prisma/internal/prismaNamespaceBrowser";
import { useAuth } from "../context/AuthContext";
import { createTransaction } from "../api/transactionService";

interface FormRow1Props {
    txCode?: string;
    applicantFirstName?: string;
    applicantLastName?: string;
}

export function FormRow1({ applicantFirstName, applicantLastName }: FormRow1Props) {
    const { user } = useAuth();

    return (
        <section className="grid grid-cols-2 gap-6">
            <GeneralInput
                name={TransactionScalarFieldEnum.userId}
                type="number"
                hidden={true}
                defaultValue={user?.id}
            />
            <GeneralInput
                name={TransactionScalarFieldEnum.shiftLogId}
                type="number"
                hidden={true}
                defaultValue={user?.shiftLogId}
            />

            <GeneralInput
                name={TransactionScalarFieldEnum.applicantFirstName}
                type="text"
                placeholder="First Name"
                label="First Name"
                isRequired={true}
                defaultValue={applicantFirstName}
            />
            <GeneralInput
                name={TransactionScalarFieldEnum.applicantLastName}
                type="text"
                placeholder="Last Name"
                label="Last Name"
                isRequired={true}
                defaultValue={applicantLastName}
            />
        </section>
    );
}

interface FormRow2Props {
    transactionType?: TransactionType;
    applicantSex?: Sex;
    transactionOutcome?: Outcome;
}

export function FormRow2({ transactionType, applicantSex, transactionOutcome }: FormRow2Props) {
    return (
        <section className="flex gap-6">
            <div className="w-1/3">
                <SelectInput
                    name={TransactionScalarFieldEnum.transactionType}
                    label="Transaction Type"
                    required
                    isRequired={true}
                    optionList={[
                        { content: "Walk-In Referral", value: TransactionType.WALK_IN_REFERRAL },
                        { content: "Online Referral", value: TransactionType.ONLINE_REFERRAL },
                        { content: "Inhouse Recruitment", value: TransactionType.IN_HOUSE_RECRUITMENT },
                    ]}
                    defaultValue={transactionType}
                />
            </div>

            <div className="w-1/3 flex flex-wrap content-start gap-x-6 gap-y-3">
                <div className="w-full bg">
                    <Text size="description" variant="dark-blue" weight="medium">
                        Sex
                    </Text>
                </div>
                <ChoiceItem
                    inputVariant="radio"
                    name={TransactionScalarFieldEnum.applicantSex}
                    value={Sex.MALE}
                    defaultChecked={applicantSex === Sex.MALE || applicantSex === undefined}
                >
                    Male
                </ChoiceItem>
                <ChoiceItem
                    inputVariant="radio"
                    name={TransactionScalarFieldEnum.applicantSex}
                    value={Sex.FEMALE}
                    defaultChecked={applicantSex === Sex.FEMALE}
                >
                    Female
                </ChoiceItem>
            </div>
            <div className="w-1/3">
                <SelectInput
                    name={TransactionScalarFieldEnum.transactionOutcome}
                    label="Transaction Outcome"
                    required
                    isRequired={true}
                    optionList={[
                        { content: "None", value: Outcome.NONE },
                        { content: "Pending", value: Outcome.PENDING },
                        { content: "Mismatched", value: Outcome.MISMATCH },
                        { content: "Success", value: Outcome.SUCCESS },
                    ]}
                    defaultValue={transactionOutcome}
                ></SelectInput>
            </div>
        </section>
    );
}

interface FormRow3Props {
    demographics?: Demographic[];
}

export function FormRow3({ demographics }: FormRow3Props) {
    return (
        <section className="flex flex-col gap-1">
            <Text size="description" variant="dark-blue" weight="medium">
                Applicant Classification
            </Text>
            <div className="flex flex-wrap gap-3">
                <ChoiceItem
                    inputVariant="checkbox"
                    stylized={true}
                    name={TransactionScalarFieldEnum.demographics}
                    value={Demographic.FIRST_TIME_JOB_SEEKER}
                    defaultChecked={demographics?.includes(Demographic.FIRST_TIME_JOB_SEEKER)}
                >
                    First Time Job Seeker
                </ChoiceItem>
                <ChoiceItem
                    inputVariant="checkbox"
                    stylized={true}
                    name={TransactionScalarFieldEnum.demographics}
                    value={Demographic.PERSONS_WITH_DISABILITY}
                    defaultChecked={demographics?.includes(Demographic.PERSONS_WITH_DISABILITY)}
                >
                    Person With Disability (PWD)
                </ChoiceItem>
                <ChoiceItem
                    inputVariant="checkbox"
                    stylized={true}
                    name={TransactionScalarFieldEnum.demographics}
                    value={Demographic.SENIOR_CITIZEN}
                    defaultChecked={demographics?.includes(Demographic.SENIOR_CITIZEN)}
                >
                    Senior Citizen
                </ChoiceItem>
                <ChoiceItem
                    inputVariant="checkbox"
                    stylized={true}
                    name={TransactionScalarFieldEnum.demographics}
                    value={Demographic.YOUNG_WORKER}
                    defaultChecked={demographics?.includes(Demographic.YOUNG_WORKER)}
                >
                    Young Worker
                </ChoiceItem>
                <ChoiceItem
                    inputVariant="checkbox"
                    stylized={true}
                    name={TransactionScalarFieldEnum.demographics}
                    value={Demographic.WORK_IMMERSION_INTERNSHIP}
                    defaultChecked={demographics?.includes(Demographic.WORK_IMMERSION_INTERNSHIP)}
                >
                    Work Immersion/Internship
                </ChoiceItem>
            </div>
        </section>
    );
}

interface FormRow4Props {
    remarks?: string;
}

export function FormRow4({ remarks }: FormRow4Props) {
    return (
        <section>
            <TextAreaInput
                id="remarks"
                label="Remarks"
                name={TransactionScalarFieldEnum.remarks}
                placeholder="Optional notes regarding the transaction..."
                defaultValue={remarks}
            />
        </section>
    );
}

//  Profile picture, name, role, and change password button
function TransactionsInputForm() {
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const handleFormChange = (e: React.SubmitEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };
    const actionData = useActionData<typeof createTransaction>();

    useEffect(() => {
        const checkAction = async () => {
            if (actionData?.success && actionData.action === "save-and-add") {
                formRef.current?.reset();
                setIsFormValid(false);
            }
        };
        checkAction();
    }, [actionData]);

    return (
        <Card className="w-full flex flex-col h-fit">
            {/* Added onChange handler here */}
            <Form ref={formRef} method="post" onChange={handleFormChange}>
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
                        type="reset"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="navy"
                        size="normal"
                        className="text-sm font-light"
                        leftIcon={{ icon: AddCircleOutlineRoundedIcon, size: "normal", variant: "white" }}
                        disabled={!isFormValid}
                        type="submit"
                        name="action"
                        value="save-and-add"
                    >
                        Save & Add Another
                    </Button>
                    <Button
                        variant="blue"
                        size="normal"
                        className="text-sm font-semibold"
                        leftIcon={{ icon: SaveOutlinedIcon, size: "normal", variant: "white" }}
                        disabled={!isFormValid}
                        type="submit"
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
    const data = useLoaderData();
    const { page, handleSetPage } = useSearchParamsTable();

    const transactions = data.transactions as Transaction[];

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
                            <DateTime dateTime={new Date(transaction.createdAt)} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{transaction.applicantFullName}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <Status type="type" variant={transaction.transactionType} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="outcome" variant={transaction.transactionOutcome} />
                        </Table.Data>
                        <Table.Data>
                            <ActionButtons
                                id={transaction.txCode}
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

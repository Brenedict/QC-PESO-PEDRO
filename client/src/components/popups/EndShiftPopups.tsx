// General Imports
import { useState } from "react";
import { Form, useLoaderData, useParams } from "react-router";

// Components
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import { Card } from "../Card";
import { PopupButton, LabeledSection, ContextBadge } from "./PopupPartials";
import { TextAreaInput, GeneralInput } from "../Input";
import Icon from "../Icon";

// Material UI Icons
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// Custom Hooks
import useNavigateDefault, { ROUTES } from "../../hooks/useNavigateDefault";

// Test Data
import { ESSStatus, type EnvironmentTag, type Transaction, type User } from "@qcpesopedro/shared/prisma/browser";
import { formatCapitalize } from "../../utils/text";
import { formatLongMonthYear } from "../../utils/time";
import { ShiftLogScalarFieldEnum } from "@qcpesopedro/shared/prisma/internal/prismaNamespaceBrowser";
import { ActionButton, ColumnText, DateTime } from "../TableCells";
import { decode } from "../../utils/hashids";
import Table from "../Table";
import Status from "../Status";
import { useAuth } from "../../context/AuthContext";
import useTablePage from "../../hooks/useTablePage";

export function PopupEndShiftReview() {
    const navigate = useNavigateDefault();

    const { user } = useAuth();
    const handleClose = () => navigate(ROUTES.endshift.root, true);
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    return (
        <Dialog dropShadow={true} onClose={handleClose} className="w-212.5 max-w-[90vw]">
            <ReviewHeaderSection handleClose={handleClose} />

            <Dialog.Body className="p-6! flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
                {/* Added onChange handler here */}
                <Form method="post" id="endShiftReviewForm" className="flex flex-col gap-5" onChange={handleFormChange}>
                    <GeneralInput hidden={true} name="verifierId" type="text" defaultValue={user?.id || ""} />

                    <DailySummarySection />

                    <div className="grid grid-cols-2 gap-5 h-fit">
                        <EndShiftEnvironmentSection />
                        <AdminRemarksSection />
                    </div>
                </Form>
            </Dialog.Body>

            {/* Pass the state to the footer */}
            <ReviewFooterSection isFormValid={isFormValid} />
        </Dialog>
    );
}

function ReviewHeaderSection({ handleClose }: { handleClose: () => void }) {
    const data = useLoaderData();

    const user = data?.shift?.user as User | undefined;

    return (
        <Dialog.Header toggleRightIcon={true} onRightAction={handleClose}>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                    <Icon icon={PersonOutlineOutlinedIcon} variant="primary-blue" size="bigMedium" />
                    <Text weight="bold" size="medium" variant="dark-blue">
                        {data?.shift?.user?.fullName ?? "N/A"}
                    </Text>
                </div>
                <Text size="description" variant="grayish-blue">
                    {user?.fullName ? formatCapitalize(user?.fullName) : "N/A"} •{" "}
                    {user?.role ? formatCapitalize(user?.role) : "N/A"} •{" "}
                    {data?.shift?.timeOut ? formatLongMonthYear(new Date(data.shift.timeOut)) : "N/A"}
                </Text>
            </div>
        </Dialog.Header>
    );
}

function DailySummarySection() {
    const { shiftId } = useParams();
    const navigate = useNavigateDefault();
    const data = useLoaderData();

    const sources: Array<{ label: string; total: number; m: number; f: number }> = [
        {
            label: "Walk-ins",
            total: data?.walkins?.total ?? "N/A",
            m: data?.walkins?.male ?? "N/A",
            f: data?.walkins?.male ?? "N/A",
        },
        {
            label: "Online Referrals",
            total: data?.online?.total ?? "N/A",
            m: data?.online?.male ?? "N/A",
            f: data?.online?.male ?? "N/A",
        },
        {
            label: "In-house Referrals",
            total: data?.inhouse?.total ?? "N/A",
            m: data?.inhouse?.male ?? "N/A",
            f: data?.inhouse?.male ?? "N/A",
        },
    ];

    const demographics: Array<{ label: string; total: number }> = [
        { label: "First Time Job Seekers", total: data?.firstTime ?? "N/A" },
        { label: "PWD", total: data?.pwd ?? "N/A" },
        { label: "Senior Citizens", total: data?.senior ?? "N/A" },
        { label: "Young Workers", total: data?.youngWorker ?? "N/A" },
        { label: "Work Immersion", total: data?.workImmersion ?? "N/A" },
    ];

    const outcomes: Array<{ label: string; total: number; highlight: boolean }> = [
        { label: "Successful Referrals", total: data?.success ?? "N/A", highlight: false },
        { label: "Pending Applications", total: data?.pending ?? "N/A", highlight: false },
        { label: "None", total: data?.none ?? "N/A", highlight: false },
        { label: "Mismatched Skills", total: data?.pending ?? "N/A", highlight: true },
    ];

    const handleDetails = (id: string) => () => {
        navigate(ROUTES.endshift.details(id), true);
    };

    return (
        <Card dropShadow={false} className="w-full">
            <Card.Header variant="off-white" className="py-4! flex justify-between">
                <Text weight="bold" size="small" variant="dark-blue">
                    DAILY SUMMARY
                </Text>

                <ActionButton handleClick={handleDetails} id={String(decode(shiftId))} text="Details" />
            </Card.Header>
            <Card.Body variant="white" className="pt-0!">
                <div className="flex justify-between items-end border-b border-off-white-border pb-4 mb-5 mt-2">
                    <Text weight="bold" variant="dark-blue">
                        Total Transactions
                    </Text>
                    <span className="text-4xl text-primary-blue font-black tracking-tight leading-none">
                        {data?.total ?? "N/A"}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-10">
                    {/* Sources */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Text size="small" weight="bold" variant="grayish-blue" className="mb-1">
                                SOURCES
                            </Text>
                            {sources.map((src) => (
                                <div key={src.label} className="flex justify-between items-center">
                                    <Text size="description" variant="dark-blue">
                                        {src.label}
                                    </Text>
                                    <div className="flex items-center gap-4">
                                        <Text size="description" weight="bold" align="right">
                                            {src.total}
                                        </Text>
                                        <div className="flex gap-2 w-16 justify-end">
                                            <Text
                                                size="small"
                                                variant="primary-blue"
                                                svg={{ icon: MaleIcon, position: "left", gap: "none", size: "small" }}
                                            >
                                                {src.m}
                                            </Text>
                                            <Text
                                                size="small"
                                                variant="red"
                                                svg={{ icon: FemaleIcon, position: "left", gap: "none", size: "small" }}
                                            >
                                                {src.f}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Text size="small" weight="bold" variant="grayish-blue" className="mb-1">
                                OUTCOMES
                            </Text>
                            {outcomes.map((out) => (
                                <div key={out.label} className="flex justify-between items-center">
                                    <Text size="description" variant={out.highlight ? "red" : "dark-blue"}>
                                        {out.label}
                                    </Text>
                                    <Text size="description" weight="bold" align="right">
                                        {out.total}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Demographics and Outcomes */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Text size="small" weight="bold" variant="grayish-blue" className="mb-1">
                                DEMOGRAPHICS
                            </Text>
                            {demographics.map((demo) => (
                                <div key={demo.label} className="flex justify-between items-center">
                                    <Text size="description" variant="dark-blue">
                                        {demo.label}
                                    </Text>
                                    <Text size="description" weight="bold" align="right">
                                        {demo.total}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

function EndShiftEnvironmentSection() {
    const data = useLoaderData();

    return (
        <Card dropShadow={false} className="w-full">
            <Card.Body variant="white" className="flex flex-col gap-5 h-full">
                <LabeledSection label="END SHIFT ENVIRONMENT">
                    <div className="flex flex-wrap gap-2 mt-2">
                        {data?.shift?.environmentTags?.length > 0 ? (
                            data.shift.environmentTags.map((tag: EnvironmentTag) => (
                                <ContextBadge key={tag} clickable={false}>
                                    {tag}
                                </ContextBadge>
                            ))
                        ) : (
                            <ContextBadge key="none" clickable={false}>
                                None
                            </ContextBadge>
                        )}
                    </div>
                </LabeledSection>
                <LabeledSection label="EMPLOYEE REMARKS">
                    <Text size="description" variant="grayish-blue" className="italic mt-1">
                        "{data?.shift?.generalRemarks?.length > 0 || "N/A"}"
                    </Text>
                </LabeledSection>
            </Card.Body>
        </Card>
    );
}

function AdminRemarksSection() {
    const data = useLoaderData();

    return (
        <Card dropShadow={false} className="w-full">
            <Card.Body variant="white" className="h-full">
                <TextAreaInput
                    id="adminRemarks"
                    name={ShiftLogScalarFieldEnum.adminRemarks}
                    label="ADMIN REMARKS"
                    placeholder="Enter reason for revision or rejection, or general notes..."
                    className="h-28 text-sm"
                    required
                    defaultValue={data?.shift?.adminRemarks ?? ""}
                    isRequired={true}
                />
            </Card.Body>
        </Card>
    );
}

function ReviewFooterSection({ isFormValid }: { isFormValid: boolean }) {
    return (
        <Dialog.Footer className="flex justify-end gap-3">
            <PopupButton
                variant="white-red"
                type="submit"
                form="endShiftReviewForm"
                name={ShiftLogScalarFieldEnum.status}
                value={ESSStatus.REJECTED}
                disabled={!isFormValid}
            >
                Reject Submission
            </PopupButton>
            <PopupButton
                variant="white-black"
                type="submit"
                form="endShiftReviewForm"
                name={ShiftLogScalarFieldEnum.status}
                value={ESSStatus.REVISION}
                disabled={!isFormValid}
            >
                Needs Revision
            </PopupButton>
            <PopupButton
                variant="blue"
                type="submit"
                form="endShiftReviewForm"
                name={ShiftLogScalarFieldEnum.status}
                value={ESSStatus.APPROVED}
                disabled={!isFormValid}
            >
                Approve Shift
            </PopupButton>
        </Dialog.Footer>
    );
}

export function PopupShiftViewTransactionDetails() {
    const { shiftId } = useParams();
    const { pageKey, closeAction } = useTablePage("subpage", ROUTES.endshift.review(decode(shiftId!) as string));
    const data = useLoaderData();

    return (
        <Dialog dropShadow={true} onClose={closeAction}>
            <Dialog.Header variant="white" onRightAction={closeAction}>
                <Text size="normal" weight="bold">
                    {`Shift Transactions: ${data?.shift?.user?.fullName ?? "N/A"}`}
                </Text>
            </Dialog.Header>
            <Table noCardStyle={true} pagination={true} items={5} pageKey={pageKey}>
                {/* Header row */}
                <Table.Row>
                    <Table.Header text="Date/Time" />
                    <Table.Header text="Applicant Name" />
                    <Table.Header text="Type" />
                    <Table.Header text="Outcome" />
                </Table.Row>

                {/* Data rows */}
                {data?.shift?.transactions?.map((transaction: Transaction) => (
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
                    </Table.Row>
                ))}
            </Table>
        </Dialog>
    );
}

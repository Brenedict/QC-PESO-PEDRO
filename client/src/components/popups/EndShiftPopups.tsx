// General Imports
import { useState } from "react";
import { Form, useParams } from "react-router";

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
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";

// Test Data
import { mockShiftData } from "../../data/endShiftReview";

export function PopupEndShiftReview() {
    const navigate = useNavigateDefault();
    const { shiftId } = useParams();
    const handleClose = () => navigate(ROUTES.endshift.root, true);
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    return (
        <Dialog dropShadow={true} onClose={handleClose} className="w-212.5 max-w-[90vw]">
            <ReviewHeaderSection handleClose={handleClose} />

            <Dialog.Body className="p-6! flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
                {/* Added onChange handler here */}
                <Form method="post" id="endShiftReviewForm" className="flex flex-col gap-5" onChange={handleFormChange}>
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={shiftId || ""} />

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
    return (
        <Dialog.Header toggleRightIcon={true} onRightAction={handleClose}>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                    <Icon icon={PersonOutlineOutlinedIcon} variant="primary-blue" size="bigMedium" />
                    <Text weight="bold" size="medium" variant="dark-blue">
                        {mockShiftData.employeeName}
                    </Text>
                </div>
                <Text size="description" variant="grayish-blue">
                    {mockShiftData.role} • {mockShiftData.shift} • {mockShiftData.date}
                </Text>
            </div>
        </Dialog.Header>
    );
}

function DailySummarySection() {
    return (
        <Card dropShadow={false} className="w-full">
            <Card.Header variant="off-white" className="py-4!">
                <Text weight="bold" size="small" variant="dark-blue">
                    DAILY SUMMARY
                </Text>
            </Card.Header>
            <Card.Body variant="white" className="pt-0!">
                <div className="flex justify-between items-end border-b border-off-white-border pb-4 mb-5 mt-2">
                    <Text weight="bold" variant="dark-blue">
                        Total Transactions
                    </Text>
                    <span className="text-4xl text-primary-blue font-black tracking-tight leading-none">
                        {mockShiftData.totalTransactions}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-10">
                    {/* Sources */}
                    <div className="flex flex-col gap-3">
                        <Text size="small" weight="bold" variant="grayish-blue" className="mb-1">
                            SOURCES
                        </Text>
                        {mockShiftData.sources.map((src) => (
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

                    {/* Demographics and Outcomes */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Text size="small" weight="bold" variant="grayish-blue" className="mb-1">
                                DEMOGRAPHICS
                            </Text>
                            {mockShiftData.demographics.map((demo) => (
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

                        <div className="flex flex-col gap-3">
                            <Text size="small" weight="bold" variant="grayish-blue" className="mb-1">
                                OUTCOMES
                            </Text>
                            {mockShiftData.outcomes.map((out) => (
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
                </div>
            </Card.Body>
        </Card>
    );
}

function EndShiftEnvironmentSection() {
    return (
        <Card dropShadow={false} className="w-full">
            <Card.Body variant="white" className="flex flex-col gap-5 h-full">
                <LabeledSection label="END SHIFT ENVIRONMENT">
                    <div className="flex flex-wrap gap-2 mt-2">
                        {mockShiftData.environmentTags.map((tag) => (
                            <ContextBadge key={tag}>{tag}</ContextBadge>
                        ))}
                    </div>
                </LabeledSection>
                <LabeledSection label="EMPLOYEE REMARKS">
                    <Text size="description" variant="grayish-blue" className="italic mt-1">
                        "{mockShiftData.employeeRemarks}"
                    </Text>
                </LabeledSection>
            </Card.Body>
        </Card>
    );
}

function AdminRemarksSection() {
    return (
        <Card dropShadow={false} className="w-full">
            <Card.Body variant="white" className="h-full">
                <TextAreaInput
                    id="adminRemarks"
                    name="adminRemarks"
                    label="ADMIN REMARKS"
                    placeholder="Enter reason for revision or rejection, or general notes..."
                    className="h-28 text-sm"
                    required
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
                name="reviewAction"
                value="reject"
                disabled={!isFormValid}
            >
                Reject Submission
            </PopupButton>
            <PopupButton
                variant="white-black"
                type="submit"
                form="endShiftReviewForm"
                name="reviewAction"
                value="revision"
                disabled={!isFormValid}
            >
                Needs Revision
            </PopupButton>
            <PopupButton
                variant="blue"
                type="submit"
                form="endShiftReviewForm"
                name="reviewAction"
                value="approve"
                disabled={!isFormValid}
            >
                Approve Shift
            </PopupButton>
        </Dialog.Footer>
    );
}

// General Imports
import { useState } from "react";
import { Form, useLoaderData } from "react-router";

// Shared Import
import { EnvironmentTag, type Transaction } from "@qcpesopedro/shared/prisma/browser";

// Components
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import Icon from "../Icon";
import Button from "../Button";
import { GeneralInput, TextAreaInput } from "../Input";
import {
    ContextBadge,
    GrayMiniCard,
    LabeledSection,
    PopupButton,
    PopupDescription,
    PopupHeader,
    PopupIcon,
} from "./PopupPartials";

// Material UI Icons
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { LogoutOutlined } from "@mui/icons-material";

// Custom Hooks
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";
import Table from "../Table";
import { ActionButtons, ColumnText, DateTime } from "../TableCells";
import Status from "../Status";
import { useSearchParamsTable } from "../../hooks/table";

export function PopupTimeIn({ root }: { root: string }) {
    const navigate = useNavigateDefault();
    return (
        <Dialog dropShadow={true} className="border-0!" onClose={() => navigate(root, true)}>
            <Dialog.Header variant="primary-blue" className="flex flex-col" toggleRightIcon={false}>
                <div className="flex justify-center mt-3">
                    <Icon
                        icon={AccessTimeOutlinedIcon}
                        size="iconHero"
                        variant="white"
                        bg={{
                            padding: "big",
                            type: "circle",
                            variant: "red-opaque",
                        }}
                    ></Icon>
                </div>
                <Text variant="white" size="big" weight="bold" align="center">
                    Time-In Required
                </Text>
                <Text variant="white" align="center" className="mb-3">
                    Welcome back! Please record your attendance.
                </Text>
            </Dialog.Header>
            <Dialog.Body>
                <Form method="post" id="timeInForm">
                    {/* Time-In Data Input Holders */}
                    <GeneralInput hidden={true} name="date" type="date" defaultValue={""}></GeneralInput>
                    <GeneralInput hidden={true} name="time" type="time" defaultValue={""}></GeneralInput>
                    <GeneralInput hidden={true} name="shift" type="text" defaultValue={"Morning Shift"}></GeneralInput>
                    <GeneralInput
                        hidden={true}
                        name="assignedOffice"
                        type="text"
                        defaultValue={"Quezon City Hall (PESO)"}
                    ></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center gap-6 max-w-md">
                    <div className="grid grid-cols-2 gap-3">
                        <GrayMiniCard descriptionText="DATE" valueText="Jul 20, 2026" />
                        <GrayMiniCard descriptionText="LIVE TIME" valueText="02:17 PM" variant="primary-blue" />
                        <GrayMiniCard descriptionText="SHIFT" valueText="Morning Shift" />
                        <GrayMiniCard
                            descriptionText="ASSIGNED OFFICE"
                            valueText="Quezon City Hall (PESO)"
                            valueSize="description"
                        />
                    </div>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton
                    leftIcon={{ icon: LogoutOutlined, variant: "grayish-blue" }}
                    variant="white"
                    onClick={() => navigate(root, true)}
                >
                    Cancel Time In
                </PopupButton>
                <PopupButton variant="blue" onClick={() => navigate(root, true)}>
                    Time In Now
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
export function PopupLogout({ root }: { root: string }) {
    const navigate = useNavigateDefault();
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    return (
        <Dialog dropShadow={true} onClose={() => navigate(root, true)}>
            <Dialog.Header onRightAction={() => navigate(root, true)}>
                <Text size="medium" weight="bold">
                    Confirm Logout
                </Text>
            </Dialog.Header>
            <Dialog.Body>
                <Form method="post" id="timeInForm" className="flex flex-col gap-6" onChange={handleFormChange}>
                    {/* Time-In Data Input Holders */}
                    <GeneralInput
                        label="Reason for Logout"
                        name="date"
                        type="text"
                        defaultValue={""}
                        required
                        isRequired={true}
                    ></GeneralInput>
                    <TextAreaInput
                        label="Optional Remarks"
                        name="time"
                        defaultValue={""}
                        placeholder="Enter additional details..."
                    ></TextAreaInput>
                </Form>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white" onClick={() => navigate(root, true)}>
                    Cancel
                </PopupButton>
                {/* Disabled the button based on the form validity */}
                <PopupButton
                    variant="red"
                    type="submit"
                    form="timeInForm"
                    onClick={() => navigate(root, false)}
                    disabled={!isFormValid}
                >
                    Logout
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupEndshiftSummary({ root }: { root: string }) {
    const navigate = useNavigateDefault();
    return (
        <Dialog dropShadow={true} onClose={() => navigate(root, true)}>
            <Dialog.Header onRightAction={() => navigate(root, true)}>
                <Text size="medium" weight="bold">
                    End of Shift Summary
                </Text>
            </Dialog.Header>
            <Dialog.Body>
                <Form method="post" id="timeInForm" className="flex flex-col gap-6">
                    {/* Time-In Data Input Holders */}
                    <div className="flex gap-4">
                        <GrayMiniCard
                            descriptionText="Total Transactions"
                            descriptionSize="description"
                            valueSize="bigger"
                            valueText="42"
                            weight="bold"
                        />
                        <GrayMiniCard
                            descriptionText="Pending"
                            descriptionSize="description"
                            valueSize="bigger"
                            valueText="3"
                            weight="bold"
                        />
                    </div>
                    <LabeledSection label="Context Tags">
                        <div className="flex flex-wrap gap-2 max-w-120">
                            <ContextBadge value={EnvironmentTag.SLOW_INTERNET}>Slow Internet</ContextBadge>
                            <ContextBadge value={EnvironmentTag.HEAVY_RAIN}>Heavy Rain</ContextBadge>
                            <ContextBadge value={EnvironmentTag.BROKEN_EQUIPMENT}>Broken Equipment</ContextBadge>
                            <ContextBadge value={EnvironmentTag.APPLICANT_ISSUES}>Applicant Issues</ContextBadge>
                            <ContextBadge value={EnvironmentTag.FEELING_UNWELL}>Feeling Unwell</ContextBadge>
                            <ContextBadge value={EnvironmentTag.BROKEN_SOFTWARE_SYSTEM}>
                                Broken Software System
                            </ContextBadge>
                        </div>
                    </LabeledSection>

                    <TextAreaInput
                        label="Optional Remarks"
                        name="time"
                        defaultValue={""}
                        placeholder="Problems, or any other concern during the shift..."
                    ></TextAreaInput>
                </Form>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white" onClick={() => navigate(root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="timeInForm" onClick={() => navigate(root, true)}>
                    Submit & End Shift
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupSessionEnd({ root }: { root: string }) {
    const navigate = useNavigateDefault();

    return (
        <Dialog dropShadow={true} onClose={() => navigate(root, true)}>
            <Dialog.Body className="px-6! py-8!">
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={WarningAmberOutlinedIcon} variant="blue" />
                    <PopupHeader>Your session will end soon due to inactivity.</PopupHeader>
                    <PopupDescription>
                        To protect government data, you will be logged out automatically
                    </PopupDescription>
                    <Button variant="blue" size="normal" onClick={() => navigate(root, true)}>
                        Stay Logged In
                    </Button>
                    <br className="block mb-3" />
                    <Button variant="white" size="normal" onClick={() => navigate(root, true)}>
                        Logout Now
                    </Button>
                </section>
            </Dialog.Body>
        </Dialog>
    );
}

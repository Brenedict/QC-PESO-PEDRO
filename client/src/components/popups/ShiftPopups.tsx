// General Imports
import { useState } from "react";
import { Form, useLoaderData, type HTMLFormMethod } from "react-router";

// Shared Import
import { EnvironmentTag } from "@qcpesopedro/shared/prisma/browser";

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
import useNavigateDefault, { ROUTES } from "../../hooks/useNavigateDefault";
import { formatRelativeDateTime, formatShortMonthYear, formatTime } from "../../utils/time";
import { logoutService } from "../../api/authService";
import { useAuth } from "../../context/AuthContext";
import { capitalizeWords } from "../../utils/text";
import InMemoryStore from "../../api/inMemoryStore";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";
import { ShiftLogScalarFieldEnum } from "@qcpesopedro/shared/prisma/internal/prismaNamespaceBrowser";
const handleCancelTimeIn = (navigate: (route: string, keepQuery?: boolean) => void) => async () => {
    const success = await logoutService();

    if (success) {
        navigate(ROUTES.auth.root, true);
    }
};

interface EndShiftFormProps {
    method?: HTMLFormMethod;
    id?: string;
    total?: number;
    pending?: number;
}
function EndShiftForm({ method = "patch", id = "timeInForm", total, pending }: EndShiftFormProps) {
    const { user } = useAuth();
    const environmentTags = (user?.shiftLog?.environmentTags as EnvironmentTag[]) ?? [];

    return (
        <Form method={method} id={id} className="flex flex-col gap-6">
            {/* Time-In Data Input Holders */}
            <div className="flex gap-4">
                <GrayMiniCard
                    descriptionText="Total Transactions"
                    descriptionSize="description"
                    valueSize="bigger"
                    valueText={total ?? "N/A"}
                    weight="bold"
                />
                <GrayMiniCard
                    descriptionText="Pending"
                    descriptionSize="description"
                    valueSize="bigger"
                    valueText={pending ?? "N/A"}
                    weight="bold"
                />
            </div>
            <LabeledSection label="Context Tags">
                <div className="flex flex-wrap gap-2 max-w-200">
                    <ContextBadge
                        value={EnvironmentTag.SLOW_INTERNET}
                        name={ShiftLogScalarFieldEnum.environmentTags}
                        defaultChecked={environmentTags?.includes(EnvironmentTag.SLOW_INTERNET)}
                    >
                        Slow Internet
                    </ContextBadge>
                    <ContextBadge
                        value={EnvironmentTag.HEAVY_RAIN}
                        defaultChecked={environmentTags?.includes(EnvironmentTag.HEAVY_RAIN)}
                        name={ShiftLogScalarFieldEnum.environmentTags}
                    >
                        Heavy Rain
                    </ContextBadge>
                    <ContextBadge
                        value={EnvironmentTag.BROKEN_EQUIPMENT}
                        defaultChecked={environmentTags?.includes(EnvironmentTag.BROKEN_EQUIPMENT)}
                        name={ShiftLogScalarFieldEnum.environmentTags}
                    >
                        Broken Equipment
                    </ContextBadge>
                    <ContextBadge
                        value={EnvironmentTag.APPLICANT_ISSUES}
                        defaultChecked={environmentTags?.includes(EnvironmentTag.APPLICANT_ISSUES)}
                        name={ShiftLogScalarFieldEnum.environmentTags}
                    >
                        Applicant Issues
                    </ContextBadge>
                    <ContextBadge
                        value={EnvironmentTag.FEELING_UNWELL}
                        defaultChecked={environmentTags?.includes(EnvironmentTag.FEELING_UNWELL)}
                        name={ShiftLogScalarFieldEnum.environmentTags}
                    >
                        Feeling Unwell
                    </ContextBadge>
                    <ContextBadge
                        value={EnvironmentTag.BROKEN_SOFTWARE_SYSTEM}
                        defaultChecked={environmentTags?.includes(EnvironmentTag.BROKEN_SOFTWARE_SYSTEM)}
                        name={ShiftLogScalarFieldEnum.environmentTags}
                    >
                        Broken Software System
                    </ContextBadge>
                </div>
            </LabeledSection>

            <TextAreaInput
                label="Optional Remarks"
                name="generalRemarks"
                defaultValue={user?.shiftLog?.generalRemarks ?? ""}
                placeholder="Problems, or any other concern during the shift..."
            />
        </Form>
    );
}

export function PopupTimeIn() {
    const { user } = useAuth();
    const navigate = useNavigateDefault();
    const today = new Date();

    return (
        <Dialog dropShadow={true} className="border-0!" onClose={() => {}}>
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
                    <GeneralInput
                        hidden={true}
                        name="userId"
                        type="number"
                        defaultValue={user?.id ?? NaN}
                    ></GeneralInput>
                    <GeneralInput
                        hidden={true}
                        name="timeIn"
                        type="text"
                        defaultValue={today.toLocaleString()}
                    ></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center gap-6 max-w-md">
                    <div className="grid grid-cols-2 gap-3">
                        <GrayMiniCard descriptionText="DATE" valueText={formatShortMonthYear(today)} />
                        <GrayMiniCard
                            descriptionText="LIVE TIME"
                            valueText={formatTime(today)}
                            variant="primary-blue"
                        />
                        <GrayMiniCard
                            descriptionText="SHIFT"
                            valueText={user?.shift ? capitalizeWords(user.shift) : "N/A"}
                        />
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
                    onClick={handleCancelTimeIn(navigate)}
                    type="button"
                >
                    Cancel Time In
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="timeInForm">
                    Time In Now
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
export function PopupLogout({ root }: { root: string }) {
    const navigate = useNavigateDefault();
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
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
    const { total, pending } = useLoaderData();

    const navigate = useNavigateDefault();
    return (
        <Dialog dropShadow={true} onClose={() => navigate(root, true)}>
            <Dialog.Header onRightAction={() => navigate(root, true)}>
                <Text size="medium" weight="bold">
                    End of Shift Summary
                </Text>
            </Dialog.Header>
            <Dialog.Body>
                <PopupDescription>Review your shift details before submitting and ending your shift.</PopupDescription>
                <EndShiftForm total={total} pending={pending} />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white" onClick={() => navigate(root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="timeInForm">
                    Submit & End Shift
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupRevisionSummary({ root }: { root: string }) {
    const { total, pending } = useLoaderData();
    const revisionShift = InMemoryStore.getRevisionShift();

    const navigate = useNavigateDefault();
    return (
        <Dialog dropShadow={true} onClose={() => navigate(root, true)}>
            <Dialog.Header onRightAction={() => navigate(root, true)}>
                <Text size="medium" weight="bold">
                    Shift Revision Summary (
                    {revisionShift?.timeOut ? formatRelativeDateTime(new Date(revisionShift?.timeOut), true) : "N/A"})
                </Text>
            </Dialog.Header>
            <Dialog.Body>
                <PopupDescription>
                    Review your revised shift details before submitting. You will return to your current shift
                    afterward.
                </PopupDescription>
                <EndShiftForm total={total} pending={pending} />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white" onClick={() => navigate(root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="timeInForm">
                    Submit Revision
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

export function PopupUnfinishedShift() {
    const { user } = useAuth();
    const { total, pending } = useLoaderData();
    const navigate = useNavigateDefault();

    return (
        <Dialog dropShadow={true} onClose={() => {}}>
            <Dialog.Body className="px-6! py-8!">
                <PopupIcon icon={WarningAmberOutlinedIcon} variant="blue" />
                <PopupHeader>
                    You have an unfinished shift (
                    {user?.shiftLog?.timeIn ? formatRelativeDateTime(new Date(user.shiftLog.timeIn), true) : "N/A"})
                </PopupHeader>
                <PopupDescription>Please submit it to ensure your shift record is saved.</PopupDescription>
                <EndShiftForm total={total} pending={pending} />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton
                    leftIcon={{ icon: LogoutOutlined, variant: "grayish-blue" }}
                    variant="white"
                    onClick={handleCancelTimeIn(navigate)}
                    type="button"
                >
                    Log Out
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="timeInForm">
                    Submit Shift
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupReviseShift() {
    const revisionShift = InMemoryStore.getRevisionShift();
    const navigate = useNavigateDefault();

    return (
        <Dialog dropShadow={true} onClose={() => {}}>
            <Dialog.Body className="px-6! py-8!">
                <PopupIcon icon={WarningAmberOutlinedIcon} variant="blue" />
                <PopupHeader>
                    Your shift requires revision (
                    {revisionShift?.timeOut ? formatRelativeDateTime(new Date(revisionShift.timeOut), true) : "N/A"})
                </PopupHeader>
                <PopupDescription>
                    Your shift requires revision. Review the remarks and make the necessary corrections before
                    resubmitting.
                </PopupDescription>
                <GeneralInput
                    label={`Reason for Revision (${revisionShift?.user?.fullName ?? "N/A"})`}
                    type="text"
                    defaultValue={revisionShift?.adminRemarks ?? "The verifier has no remarks."}
                    disabled
                />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton
                    leftIcon={{ icon: LogoutOutlined, variant: "grayish-blue" }}
                    variant="white"
                    onClick={handleCancelTimeIn(navigate)}
                    type="button"
                >
                    Log Out
                </PopupButton>
                <Form method="patch">
                    <PopupButton variant="blue" type="submit">
                        Revise Shift
                    </PopupButton>
                </Form>
            </Dialog.Footer>
        </Dialog>
    );
}

// General Imports
import { useState } from "react";
import { Form, useLoaderData, type HTMLFormMethod } from "react-router";

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
import useNavigateDefault, { ROUTES } from "../../hooks/useNavigateDefault";
import { formatShortMonthYear, formatTime, getDayPeriod } from "../../utils/time";
import { logoutService } from "../../api/authService";
import { useAuth } from "../../context/AuthContext";
import { capitalizeWords } from "../../utils/text";
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
                <div className="flex flex-wrap gap-2 max-w-120">
                    <ContextBadge value={EnvironmentTag.SLOW_INTERNET} name="environmentTags">
                        Slow Internet
                    </ContextBadge>
                    <ContextBadge value={EnvironmentTag.HEAVY_RAIN} name="environmentTags">
                        Heavy Rain
                    </ContextBadge>
                    <ContextBadge value={EnvironmentTag.BROKEN_EQUIPMENT} name="environmentTags">
                        Broken Equipment
                    </ContextBadge>
                    <ContextBadge value={EnvironmentTag.APPLICANT_ISSUES} name="environmentTags">
                        Applicant Issues
                    </ContextBadge>
                    <ContextBadge value={EnvironmentTag.FEELING_UNWELL} name="environmentTags">
                        Feeling Unwell
                    </ContextBadge>
                    <ContextBadge value={EnvironmentTag.BROKEN_SOFTWARE_SYSTEM} name="environmentTags">
                        Broken Software System
                    </ContextBadge>
                </div>
            </LabeledSection>

            <TextAreaInput
                label="Optional Remarks"
                name="generalRemarks"
                defaultValue={""}
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
        <Dialog dropShadow={true} className="border-0!" onClose={handleCancelTimeIn(navigate)}>
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
    const { total, pending } = useLoaderData();
    const navigate = useNavigateDefault();

    return (
        <Dialog dropShadow={true} onClose={handleCancelTimeIn(navigate)}>
            <Dialog.Body className="px-6! py-8!">
                <PopupIcon icon={WarningAmberOutlinedIcon} variant="blue" />
                <PopupHeader>You have an unfinished shift last time</PopupHeader>
                <PopupDescription>To keep your shift recorded, please submit it </PopupDescription>
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

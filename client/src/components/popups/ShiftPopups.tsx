// General Imports
import { Form, redirect, useParams } from "react-router";

// Hooks
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";

// Components
import { Card } from "../Card";
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import Icon from "../Icon";
import Button from "../Button";

// Icons
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

// Test Data
import { decode } from "../../utils/hashids";
import { GeneralInput } from "../Input";

export function PopupTimeIn() {
    const navigate = useNavigateDefault();
    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.history.root, true)}>
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
                    <GeneralInput hidden name="date" type="date" defaultValue={""}></GeneralInput>
                    <GeneralInput hidden name="time" type="time" defaultValue={""}></GeneralInput>
                    <GeneralInput hidden name="shift" type="text" defaultValue={"Morning Shift"}></GeneralInput>
                    <GeneralInput
                        hidden
                        name="assignedOffice"
                        type="text"
                        defaultValue={"Quezon City Hall (PESO)"}
                    ></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center gap-6 max-w-md">
                    <div className="grid grid-cols-2 gap-3">
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    DATE
                                </Text>
                                <Text variant="black">Jul 20, 2026</Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    LIVE TIME
                                </Text>
                                <Text variant="black">02:17 PM</Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    SHIFT
                                </Text>
                                <Text variant="black">Morning Shift</Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    ASSIGNED OFFICE
                                </Text>
                                <Text variant="black">Quezon City Hall (PESO)</Text>
                            </Card.Body>
                        </Card>
                    </div>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <Button variant="white" size="small" onClick={() => navigate(ROUTES.dashboard.root, true)}>
                    Cancel Time In
                </Button>
                <Button
                    variant="blue"
                    size="small"
                    type="submit"
                    form="timeInForm"
                    onClick={() => navigate(ROUTES.dashboard.root, true)}
                >
                    Time In Now
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupLogout() {
    const navigate = useNavigateDefault();
    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.history.root, true)}>
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
                    <GeneralInput hidden name="date" type="date" defaultValue={""}></GeneralInput>
                    <GeneralInput hidden name="time" type="time" defaultValue={""}></GeneralInput>
                    <GeneralInput hidden name="shift" type="text" defaultValue={"Morning Shift"}></GeneralInput>
                    <GeneralInput
                        hidden
                        name="assignedOffice"
                        type="text"
                        defaultValue={"Quezon City Hall (PESO)"}
                    ></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center gap-6 max-w-md">
                    <div className="grid grid-cols-2 gap-3">
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    DATE
                                </Text>
                                <Text variant="black">Jul 20, 2026</Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    LIVE TIME
                                </Text>
                                <Text variant="black">02:17 PM</Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    SHIFT
                                </Text>
                                <Text variant="black">Morning Shift</Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body bordered={true} variant="grayish-blue-opaque">
                                <Text variant="grayish-blue" size="small" weight="bold">
                                    ASSIGNED OFFICE
                                </Text>
                                <Text variant="black">Quezon City Hall (PESO)</Text>
                            </Card.Body>
                        </Card>
                    </div>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <Button variant="white" size="small" onClick={() => navigate(ROUTES.dashboard.root, true)}>
                    Cancel Time In
                </Button>
                <Button
                    variant="blue"
                    size="small"
                    type="submit"
                    form="timeInForm"
                    onClick={() => navigate(ROUTES.dashboard.root, true)}
                >
                    Time In Now
                </Button>
            </Dialog.Footer>
        </Dialog>
    );
}

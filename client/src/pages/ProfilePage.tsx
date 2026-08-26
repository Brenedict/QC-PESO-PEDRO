// General Imports
import { Outlet, useSearchParams } from "react-router";
import useNavigateDefault, { ROUTES } from "../hooks/useNavigateDefault";

// Components
import { Text } from "../components/Text";
import PageHeader from "../components/PageHeader";
import Profile from "../components/Profile";
import Button from "../components/Button";
import { GeneralInput } from "../components/Input";
import ChoiceItem from "../components/ChoiceItem";
import { Card } from "../components/Card";
import Icon from "../components/Icon";

// Icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

// Types
import type { MaterialIcon } from "../types/common";

// Context
import { useUserGlobal } from "../context/UserGlobalContext.tsx";
import { useEffect, useState } from "react";
import { NotificationPopup } from "../components/popups/NotificationPopups.tsx";

//  Profile picture, name, role, and change password button
function ProfileSummaryCard() {
    const { firstName, lastName, role } = useUserGlobal();
    const navigate = useNavigateDefault();
    return (
        <Card className="w-full md:w-1/3 flex flex-col">
            {" "}
            <Card.Header variant="off-white" bordered={true} className="h-28">
                {" "}
                {null}
            </Card.Header>
            <Card.Body className="flex-1 flex flex-col items-center text-center relative pt-0">
                {/*Profile Picture*/}
                <div className="absolute -top-12">
                    <Profile size="big" userFullName={`${firstName} ${lastName}`} />
                </div>

                <div className="mt-14 mb-2">
                    <Text size="bigger" weight="bold" variant="dark-blue" align="center">
                        {`${firstName} ${lastName}`}
                    </Text>
                </div>

                {/*Role*/}
                <div className="bg-grayish-blue-opaque text-primary-blue px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold mb-4 tracking-wide uppercase">
                    <Icon icon={SecurityOutlinedIcon} size="small" variant="primary-blue" />
                    {role === "SUPERADMIN"
                        ? "Super Administrator"
                        : role === "ADMIN"
                          ? "Administrator"
                          : "Frontline Encoder"}
                </div>

                <Text size="description" variant="grayish-blue" align="center">
                    Processing daily walk-ins and referral transactions for the Public Employment Division.
                </Text>
            </Card.Body>
            <Card.Footer variant="white" bordered={false} className="pt-2 pb-6 px-6">
                <Button
                    variant="white-black"
                    size="normal"
                    className="w-full text-sm font-semibold"
                    leftIcon={{ icon: KeyOutlinedIcon, size: "medium", variant: "black" }}
                    onClick={() => navigate(ROUTES.profile.changePassword, true)}
                >
                    Change Password
                </Button>
            </Card.Footer>
        </Card>
    );
}

// read-only inputs and system toggles
function AccountInfoCard() {
    const { firstName, lastName, email, role, shift } = useUserGlobal();

    const renderLabel = (IconComponent: MaterialIcon, text: string) => (
        <div className="uppercase mb-2">
            <Text
                variant="grayish-blue"
                size="small"
                weight="bold"
                svg={{ icon: IconComponent, gap: "small", position: "left", size: "medium" }}
            >
                {text}
            </Text>
        </div>
    );

    return (
        <Card className="w-full md:w-2/3 h-fit">
            <Card.Header variant="off-white" bordered>
                <Text size="medium" weight="bold" variant="dark-blue">
                    Account Information
                </Text>
            </Card.Header>
            <Card.Body className="p-6!">
                {/*Grid layout for the Account Inputs*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GeneralInput
                        type="text"
                        id="fullName"
                        label={renderLabel(PersonOutlineOutlinedIcon, "Full Name")}
                        placeholder="Enter full name"
                        value={`${firstName} ${lastName}`}
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                    <GeneralInput
                        type="email"
                        id="email"
                        label={renderLabel(MailOutlineOutlinedIcon, "QC Government Email")}
                        placeholder="Enter email"
                        value={email}
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                    <GeneralInput
                        type="text"
                        id="role"
                        label={renderLabel(BadgeOutlinedIcon, "Role")}
                        placeholder="Enter role"
                        value={role}
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                    <GeneralInput
                        type="text"
                        id="department"
                        label={renderLabel(BusinessOutlinedIcon, "Shift")}
                        placeholder="Enter department"
                        value={shift}
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                </div>

                <hr className="my-8 border-off-white-border" />

                <Text size="normal" weight="bold" variant="dark-blue">
                    System Preferences
                </Text>

                {/*Notification Toggles*/}
                <div className="mt-4 flex flex-col gap-4">
                    <ChoiceItem inputVariant="checkbox" stylized={false} defaultChecked>
                        Enable email notifications for system announcements
                    </ChoiceItem>
                    <ChoiceItem inputVariant="checkbox" stylized={false} defaultChecked>
                        Play sound for incoming notifications
                    </ChoiceItem>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button variant="blue" size="normal" className="text-description!">
                        Save Preferences
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

// Sidebar, Topbar, and the Profile Content
function ProfilePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [passwordChangeStatus, setPasswordChangeStatus] = useState<string>("");
    const [notifModalOpen, setNotifModalOpen] = useState(false);

    useEffect(() => {
        const statusKey = searchParams.get("passwordChangeStatus");

        if (statusKey) {
            setPasswordChangeStatus(statusKey);
            setNotifModalOpen(true);

            // Clean up query param from URL
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("passwordChangeStatus");
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const handleCloseModal = () => {
        setNotifModalOpen(false);
        setPasswordChangeStatus(""); // Reset string state on close
    };

    return (
        <>
            <PageHeader
                primaryText="My Profile"
                secondaryText="Manage your personal information and account security."
            />
            <div className="flex flex-col md:flex-row gap-6">
                <ProfileSummaryCard />
                <AccountInfoCard />
            </div>

            {/* Popup Uses */}
            <Outlet />

            {/* Render based on notifModalOpen boolean state */}
            {notifModalOpen && (
                <NotificationPopup
                    header={passwordChangeStatus}
                    icon="notification"
                    onClose={handleCloseModal} // Pass close handler to popup
                />
            )}
        </>
    );
}
export default ProfilePage;

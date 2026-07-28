import { NavBar } from "../components/Navbar";
import TopBar from "../components/Topbar";
import { Text } from "../components/Text";
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

// Title and description of the page
function PageHeader() {
    return (
        <div className="mb-6">
            <Text size="giant" weight="bold" variant="dark-blue">
                My Profile
            </Text>
            <Text size="normal" weight="normal" variant="grayish-blue">
                Manage your personal information and account security.
            </Text>
        </div>
    );
}

//  Profile picture, name, role, and change password button
function ProfileSummaryCard() {
    return (
        <Card className="w-full md:w-1/3 flex flex-col h-fit">
            <Card.Header variant="off-white" bordered={false} className="h-28">
                {null}
            </Card.Header>

            <Card.Body className="flex-1 flex flex-col items-center text-center relative pt-0">
                {/*Profile Picture*/}
                <div className="absolute -top-12">
                    <Profile size="big" userFullName="Juan Cruz" />
                </div>

                <div className="mt-14 mb-2">
                    <Text size="bigger" weight="bold" variant="dark-blue" align="center">
                        Juan Cruz
                    </Text>
                </div>

                {/*Role*/}
                <div className="bg-[#E0F2FE] text-[#0369A1] px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold mb-4 tracking-wide uppercase">
                    <Icon icon={SecurityOutlinedIcon} size="small" variant="primary-blue" />
                    Frontline Encoder
                </div>

                <Text size="small" variant="grayish-blue" align="center">
                    Processing daily walk-ins and referral transactions for the Public Employment Division.
                </Text>
            </Card.Body>

            <Card.Footer variant="white" bordered={false} className="pt-2">
                <Button
                    variant="white"
                    size="normal"
                    className="w-full text-sm font-semibold"
                    leftIcon={{ icon: KeyOutlinedIcon, size: "small", variant: "grayish-blue" }}
                >
                    Change Password
                </Button>
            </Card.Footer>
        </Card>
    );
}

// read-only inputs and system toggles
function AccountInfoCard() {
    const renderLabel = (IconComponent: any, text: string) => (
        <span className="flex items-center gap-1.5 text-xs tracking-wider text-gray-500 font-semibold uppercase mb-1">
            <IconComponent fontSize="small" />
            {text}
        </span>
    );

    return (
        <Card className="w-full md:w-2/3 h-fit">
            <Card.Body className="p-8">
                <Text size="big" weight="bold" variant="dark-blue">
                    Account Information
                </Text>

                {/*Grid layout for the Account Inputs*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                    <GeneralInput
                        type="text"
                        id="fullName"
                        label={renderLabel(PersonOutlineOutlinedIcon, "Full Name")}
                        placeholder="Enter full name"
                        value="Juan Dela Cruz"
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                    <GeneralInput
                        type="email"
                        id="email"
                        label={renderLabel(MailOutlineOutlinedIcon, "QC Government Email")}
                        placeholder="Enter email"
                        value="juan.cruz@quezoncity.gov.ph"
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                    <GeneralInput
                        type="text"
                        id="role"
                        label={renderLabel(BadgeOutlinedIcon, "Role")}
                        placeholder="Enter role"
                        value="Frontline Encoder"
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                    <GeneralInput
                        type="text"
                        id="department"
                        label={renderLabel(BusinessOutlinedIcon, "Department")}
                        placeholder="Enter department"
                        value="Public Employment Division (PED)"
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-600 focus:outline-none"
                    />
                </div>

                <hr className="my-8 border-off-white-border" />

                <Text size="big" weight="bold" variant="dark-blue">
                    System Preferences
                </Text>

                {/*Notification Toggles*/}
                <div className="mt-6 flex flex-col gap-4">
                    <ChoiceItem inputVariant="checkbox" stylized={false} defaultChecked>
                        Enable email notifications for system announcements
                    </ChoiceItem>
                    <ChoiceItem inputVariant="checkbox" stylized={false} defaultChecked>
                        Play sound for incoming notifications
                    </ChoiceItem>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button variant="blue" size="normal">
                        Save Preferences
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

// Sidebar, Topbar, and the Profile Content
function MyProfile() {
    const topbarProps = {
        onSearchChange: () => {},
        onNotifClick: () => {},
        hasNotif: true,
        userFullName: "Juan Cruz",
        roleType: "frontline" as const,
        status: "online" as const,
    };

    return (
        <div className="flex min-h-screen bg-off-white">
            <NavBar userType="frontline" userFullName="Juan Cruz" headerText="PED System" />

            <main className="flex-1 flex flex-col">
                <TopBar {...topbarProps} />

                <div className="p-8 flex-1">
                    <PageHeader />
                    <div className="flex flex-col md:flex-row gap-6">
                        <ProfileSummaryCard />
                        <AccountInfoCard />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyProfile;

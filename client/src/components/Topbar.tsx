// General Imports
import { useEffect, useState } from "react";

// Components
import Status from "./Status.tsx";
import { Text } from "./Text";
import { SearchInput } from "./Input.tsx";
import Profile from "./Profile";
import Button from "./Button.tsx";
import NotificationsDropdown from "./NotificationsDropdown";

// Material UI Icons
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

// Custom Hooks
import useNavigateDefault from "../hooks/useNavigateDefault";

// Contexts
import { useUserGlobal } from "../context/UserGlobalContext.tsx";

// Utils
import { getDateTimeNow } from "../utils/time.ts";
import { useAuth } from "../context/AuthContext.tsx";

function LeftSection() {
    const { onSearchChange } = useUserGlobal();

    return (
        <section className="flex items-center mr-20">
            <SearchInput placeholder="Search transactions..." onChange={onSearchChange} />
        </section>
    );
}

function DateTime() {
    const [dateTime, setDateTime] = useState(getDateTimeNow);

    useEffect(() => {
        const key = setInterval(() => {
            setDateTime(getDateTimeNow());
        }, 1000 * 60);

        return () => clearInterval(key);
    }, []);

    return (
        <Text
            size="description"
            variant="grayish-blue"
            weight="medium"
            svg={{
                gap: "small",
                icon: AccessTimeOutlinedIcon,
                position: "left",
                size: "bigMedium",
            }}
        >
            {dateTime}
        </Text>
    );
}

function NotifButton() {
    return <NotificationsDropdown />;
}

function ProfileSection() {
    const { firstName, lastName, role } = useUserGlobal();

    return (
        <div className="flex">
            <div className="mr-3 flex flex-col text-right">
                <Text size="description" variant="dark-blue" weight="semiBold" align="right">
                    {`${firstName} ${lastName}`}
                </Text>

                <Text size="small" variant="primary-blue" weight="medium" align="right">
                    {role === "SUPERADMIN"
                        ? "Super Administrator"
                        : role === "ADMIN"
                          ? "Administrator"
                          : "Frontline Encoder"}
                </Text>
            </div>

            <Profile userFullName={`${firstName} ${lastName}`} size="small" />
        </div>
    );
}

function RightSection() {
    const { user } = useAuth();
    const { status } = useUserGlobal();
    const navigate = useNavigateDefault();

    return (
        <section className="flex items-center">
            <div className="mr-4">
                <Status type="status" variant={status} />
            </div>

            <div className="mr-2">
                <DateTime />
            </div>

            <div className="mr-4">
                <NotifButton />
            </div>

            <div className="w-0.5 h-8 bg-off-white-border mr-4"></div>

            <div className="mr-8">
                <ProfileSection />
            </div>

            <Button
                variant={user?.isRevising === true ? "blue" : "red"}
                size="small"
                className="px-4 py-2 rounded-xl"
                disabled={user?.hasEndedShift}
                onClick={() =>
                    navigate(
                        `${window.location.pathname}/${user?.isRevising === true ? "submit-revision" : "end-shift-confirmation"}`
                    )
                }
            >
                {user?.isRevising === true ? "Submit Revision" : "End Shift"}
            </Button>
        </section>
    );
}

function TopBar() {
    return (
        <header className="flex items-center justify-end px-8 py-4 shadow-default w-full min-w-max sticky top-0 z-50 bg-white">
            {/* <LeftSection /> */}
            <RightSection />
        </header>
    );
}

export default TopBar;

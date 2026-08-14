import Status from "./Status.tsx";
import type { TopBarContextValue } from "../context/TopbarContext.ts";
import { Text } from "./Text";
import { SearchInput } from "./Input.tsx";
import { useContext, useEffect, useState } from "react";
import { getDateTimeNow } from "../utils/time.ts";
import Icon from "./Icon";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import Profile from "./Profile";
import Button from "./Button.tsx";

// Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";
import TopBarContext from "../context/TopbarContext.ts";

function LeftSection() {
    const { onSearchChange } = useContext(TopBarContext);
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
        }, 1000 * 60); // 1 minute

        return () => {
            clearInterval(key);
        };
    }, []);

    return (
        <Text
            size="description"
            variant="grayish-blue"
            weight="medium"
            svg={{ gap: "small", icon: AccessTimeOutlinedIcon, position: "left", size: "bigMedium" }}
        >
            {dateTime}
        </Text>
    );
}

function NotifButton() {
    const { onNotifClick, hasNotif } = useContext(TopBarContext);
    return (
        <Button
            onClick={onNotifClick}
            size="small"
            variant="white-black"
            className="min-w-0! aspect-square h-10 w-auto "
        >
            <Icon
                variant={hasNotif ? "red" : "grayish-blue"}
                icon={hasNotif ? NotificationImportantOutlinedIcon : NotificationsNoneOutlinedIcon}
                size="big"
            />
        </Button>
    );
}

function ProfileSection() {
    const { firstName, lastName, role } = useContext(TopBarContext);
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
    const { status } = useContext(TopBarContext);
    const navigate = useNavigateDefault();
    return (
        <section className="flex items-center">
            <div className="mr-4">
                <Status type="status" variant={status} />
            </div>
            <div className="mr-2">
                <DateTime />
            </div>
            <div className="mr-2"></div>

            <div className="mr-4">
                <NotifButton />
            </div>

            {/* Line div */}
            <div className="w-0.5 h-8 bg-off-white-border mr-4"></div>

            <div className="mr-8">
                <ProfileSection />
            </div>

            <Button
                variant="red"
                size="small"
                className="px-4 py-2 rounded-xl"
                onClick={() => navigate(`${window.location.pathname}/end-shift-confirmation`)}
            >
                End Shift
            </Button>
        </section>
    );
}

function TopBar(props: TopBarContextValue) {
    return (
        <TopBarContext value={props}>
            <header className="flex items-center justify-between px-8 py-4 shadow-default w-full min-w-max sticky top-0 z-50 bg-white">
                {/* Left Section */}
                <LeftSection />

                {/* Right Section */}
                <RightSection />
            </header>
        </TopBarContext>
    );
}

export default TopBar;

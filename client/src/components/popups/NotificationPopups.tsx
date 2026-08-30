// Components
import { Dialog } from "../Dialog";
import Button from "../Button";
import { PopupIcon, PopupHeader, PopupDescription } from "./PopupPartials";

// Material UI Icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

// Custom Hooks
import useNavigateDefault from "../../hooks/useNavigateDefault";

export function NotificationPopup({
    onClose,
    icon = "notification",
    header,
    description,
}: {
    onClose: () => void;
    icon: "notification" | "warning";
    header: string;
    description?: string;
}) {
    const navigate = useNavigateDefault();

    const iconHero = icon == "notification" ? NotificationsIcon : ReportProblemOutlinedIcon;

    return (
        <Dialog dropShadow={true} onClose={onClose}>
            <Dialog.Body className="px-6! py-8!">
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={iconHero} variant="blue" />
                    <PopupHeader>{header}</PopupHeader>

                    {description && <PopupDescription>{description}</PopupDescription>}
                </section>
            </Dialog.Body>
        </Dialog>
    );
}

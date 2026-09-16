// Components
import { Dialog } from "../Dialog";
import Button from "../Button";

// Material UI Icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export function NotificationPopup({
    onClose,
    icon = "notification",
    header,
    description,
}: {
    onClose: () => void;
    icon?: "notification" | "warning";
    header: string;
    description?: string;
}) {
    const fallbackDescription =
        header === "Email not found"
            ? "We couldn't find an account associated with this email address. Please check your email and try again."
            : header.toLowerCase().includes("password changed")
              ? "You can now use your new password to sign in to your account."
              : header === "User has already finished shift this day"
                ? "You have already completed your shift and cannot log in again today."
                : header === "Password Incorrect"
                  ? "The password you entered is incorrect. Please try again."
                  : undefined;

    const popupDescription = description ?? fallbackDescription;
    const isAmberWarning =
        header === "User has already finished shift this day" || header === "Password Incorrect" || icon === "warning";
    const IconComponent = isAmberWarning ? ReportProblemOutlinedIcon : NotificationsIcon;

    return (
        <Dialog dropShadow={true} onClose={onClose}>
            <Dialog.Body className="px-8! py-8!">
                <section className="w-[380px] max-w-[calc(100vw-32px)] flex flex-col items-center text-center mx-auto">
                    <div className="mb-4">
                        <div
                            className={`w-[70px] h-[70px] rounded-full flex items-center justify-center ${
                                isAmberWarning ? "bg-amber-100" : "bg-gray-100"
                            }`}
                        >
                            <IconComponent
                                sx={{
                                    fontSize: 42,
                                    color: isAmberWarning ? "#f59e0b" : "#075985",
                                }}
                            />
                        </div>
                    </div>

                    {/* Header & Description */}
                    <div className="w-full mb-6">
                        <h2 className="text-[20px] leading-[26px] font-bold text-gray-900 mb-2">{header}</h2>

                        {popupDescription && (
                            <p className="text-[14px] leading-[21px] text-gray-600">{popupDescription}</p>
                        )}
                    </div>

                    {/* Button */}
                    <div className="w-full">
                        <Button variant="blue" size="normal" className="w-full!" onClick={onClose}>
                            OK
                        </Button>
                    </div>
                </section>
            </Dialog.Body>
        </Dialog>
    );
}

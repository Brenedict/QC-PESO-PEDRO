import { useNavigate } from "react-router";
import { useNavigateDefault, ROUTES } from "../hooks/reroute";
import { Text } from "../components/Text";
import Button from "../components/Button";

// Icons
import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

// COMPONENTS
function NotFoundVisual() {
    return <FolderOffOutlinedIcon sx={{ fontSize: 120 }} className="text-slate-300 drop-shadow-sm" />;
}

function NotFoundText() {
    return (
        <div className="flex max-w-[500px] flex-col items-center gap-2">
            <Text size="giant" weight="bold" variant="dark-blue" className="text-[64px] leading-none">
                404
            </Text>

            <Text size="big" weight="bold" variant="dark-blue">
                Record Not Found
            </Text>

            <Text size="medium" variant="grayish-blue" weight="normal" className="mt-2">
                P.E.D.R.O. searched everywhere, but this page is missing from our files. Baka mali ang na-type na URL o
                nai-delete na ang page na ito.
            </Text>
        </div>
    );
}

function NotFoundAction() {
    const navigateDefault = useNavigateDefault();
    const navigate = useNavigate();

    return (
        <div className="mt-8 flex flex-col items-center gap-4">
            {/* Primary Action */}
            <Button
                variant="blue"
                size="normal"
                leftIcon={{
                    icon: ArrowBackRoundedIcon,
                    size: "normal",
                    variant: "white",
                }}
                onClick={() => navigateDefault(ROUTES.dashboard.root, false)}
            >
                Back to Dashboard
            </Button>

            {/* Secondary Action: Subtle Text Link */}
            <button
                onClick={() => navigate(-1)}
                className="text-[15px] font-medium text-slate-400 underline-offset-4 transition-colors hover:text-slate-600 hover:underline"
            >
                Go back to previous page
            </button>
        </div>
    );
}

export default function NotFoundPage() {
    return (
        <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-6 px-6 text-center">
            <NotFoundVisual />
            <NotFoundText />
            <NotFoundAction />
        </div>
    );
}

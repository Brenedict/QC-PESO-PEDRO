// General Imports
import { useRouteError } from "react-router";

// COMPONENTS
import { Text } from "../components/Text";
import Button from "../components/Button";

// Material UI Icons
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

function SystemErrorVisual() {
    return <WarningAmberRoundedIcon sx={{ fontSize: 120 }} className="text-red-400 opacity-80 drop-shadow-sm" />;
}

function SystemErrorText() {
    const error = useRouteError();
    console.error("System Error Caught by ErrorBoundary:", error);

    return (
        <div className="flex max-w-[500px] flex-col items-center gap-2">
            <Text size="giant" weight="bold" variant="dark-blue" className="text-[56px] leading-none">
                System Error
            </Text>

            <Text size="big" weight="bold" variant="dark-blue">
                Something went wrong.
            </Text>

            <Text size="medium" variant="grayish-blue" weight="normal" className="mt-2">
                P.E.D.R.O. encountered an unexpected error while processing your request. Our developers have been
                notified. Please try refreshing the page.
            </Text>
        </div>
    );
}

function SystemErrorAction() {
    return (
        <div className="mt-8 flex flex-col items-center gap-4">
            <Button
                variant="blue"
                size="normal"
                leftIcon={{
                    icon: RefreshRoundedIcon,
                    size: "normal",
                    variant: "white",
                }}
                onClick={() => window.location.reload()}
            >
                Refresh Page
            </Button>
        </div>
    );
}

export default function SystemErrorPage() {
    return (
        <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-6 px-6 text-center">
            <SystemErrorVisual />
            <SystemErrorText />
            <SystemErrorAction />
        </div>
    );
}

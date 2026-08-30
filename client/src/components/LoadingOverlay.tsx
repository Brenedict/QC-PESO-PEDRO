// General Imports
import CircularProgress from "@mui/material/CircularProgress";

export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black-opaque ">
            <div className="flex flex-col items-center gap-3 px-8 py-6 rounded-xl bg-white shadow-lg">
                <CircularProgress size={48} thickness={4} />
                <span className="text-sm text-grayish-blue font-bold">Loading…</span>
            </div>
        </div>
    );
}

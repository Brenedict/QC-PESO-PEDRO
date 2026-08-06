export function getDateTimeNow() {
    const date = new Date(); // Get time now

    const datePart = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date);

    return `${datePart} • ${timePart}`;
}

export function formatShortMonthYear(date: Date): string {
    // Jan 15, 2024
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatLongMonthYear(date: Date): string {
    // January 15, 2024
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function formatTime(date: Date): string {
    // Example: 7:58 AM
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export const formatDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0‑based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

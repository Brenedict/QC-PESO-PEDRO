export function getDayPeriod(date: Date, addShift: boolean = false) {
    const hour = date.getHours();
    return (hour < 12 ? "Morning" : "Afternoon") + (addShift ? " Shift" : "");
}

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

export function formatMonthDay(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "long", // “July”
        day: "numeric", // “17”
    });
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

export function formatDuration(start: Date, end: Date): string {
    // Get the absolute difference in milliseconds
    const diffMs = Math.abs(end.getTime() - start.getTime());

    // Convert to whole hours and remaining minutes
    const totalMinutes = Math.floor(diffMs / (1000 * 60)); // ms → minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Pad minutes to two digits (e.g., 05)
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}h ${paddedMinutes}m`;
}

// Date formatting component
export const formatRelativeDateTime = (dateTime: Date, keepDate = false) => {
    const now = new Date();
    const target = new Date(dateTime);

    const isToday = target.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = target.toDateString() === yesterday.toDateString();

    const timeString = formatTime(target);

    if (isToday) {
        return `Today, ${timeString}`;
    }
    if (isYesterday) {
        return `Yesterday, ${timeString}`;
    }

    if (keepDate) {
        const dateString = dateTime.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        return `${dateString}, ${timeString}`;
    }

    return timeString;
};

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

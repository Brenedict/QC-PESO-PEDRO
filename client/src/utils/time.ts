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

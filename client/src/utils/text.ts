export function formatCapitalize(value: string) {
    if (!value) return "";
    return value
        .split("_")
        .filter(Boolean)
        .map((p) => p[0].toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
}

export function formatCapitalize(value: string) {
    if (!value) return "";
    return value
        .split("_")
        .filter(Boolean)
        .map((p) => p[0].toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
}

export function capitalizeWords(sentence: string) {
    return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export function formatLabel(name: string): string {
    // Convert "WALK_IN_REFERRAL" -> "Walk-In Referral"
    return name
        .toLowerCase()
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

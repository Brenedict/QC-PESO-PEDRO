// PEDRO SHARED IMPORTS
import type { QueryBreakdownType } from "@qcpesopedro/shared/schema/transactions";

export const TODAY = new Date("2026-08-19T00:00:00.000Z");

export const YESTERDAY = new Date(TODAY.getDate() - 1);
YESTERDAY.setHours(0, 0, 0, 0);

export const TOMORROW = new Date(TODAY.getDate() + 1);
TOMORROW.setHours(23, 59, 59, 999);

export default {
    getFormattedDate(date: Date) {
        // 0826 = 08/26
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);
        return `${mm}${yy}`;
    },
    getPreviousDateRange(startDate: Date, endDate: Date) {
        const duration = endDate.getTime() - startDate.getTime();

        const previousEnd = new Date(startDate.getTime() - 1);
        const previousStart = new Date(previousEnd.getTime() - duration);

        return {
            startDate: previousStart,
            endDate: previousEnd,
        };
    },
    buildDayRange(date: Date, startHour = 0, endHour = 23) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const startDate = new Date(year, month, day, startHour, 0, 0, 0);
        const endDate = new Date(year, month, day, endHour, 59, 59, 999);
        return { startDate, endDate };
    },
    buildWeekRange(date: Date) {
        const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;

        const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + distanceToMonday, 0, 0, 0, 0);
        const friday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 23, 59, 59, 999);
        return { startDate: monday, endDate: friday };
    },
    buildMonthRange(date: Date) {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
        return { startDate, endDate };
    },
    formatDateBucket(bucket: Date, breakdown: QueryBreakdownType["breakdown"]) {
        const { year, month, day, hour } = {
            year: String(bucket.getFullYear()),
            month: String(bucket.getMonth() + 1).padStart(2, "0"),
            day: String(bucket.getDate()).padStart(2, "0"),
            hour: String(bucket.getHours()).padStart(2, "0"),
        };

        switch (breakdown) {
            case "HOURLY":
                return hour;
            case "DAILY":
            case "WEEKLY":
                return `${year}-${month}-${day}`;
            case "MONTHLY":
                return `${year}-${month}`;
            case "YEARLY":
                return `${year}`;
        }
    },
    formatInterval(totalSeconds: number): string {
        if (totalSeconds <= 0) return "N/A";

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (hours <= 0) return `${minutes}m`;

        return `${hours}h ${minutes}m`;
    },

    offsetHours(date: Date, offset: number) {
        const offsetted = new Date(date);
        offsetted.setHours(offsetted.getHours() + offset);

        return offsetted;
    },
    offsetMinutes(date: Date, offset: number) {
        const offsetted = new Date(date);
        offsetted.setMinutes(offsetted.getMinutes() + offset);

        return offsetted;
    },
    offsetDays(date: Date, offset: number) {
        const offsetted = new Date(date);
        offsetted.setDate(offsetted.getDate() + offset);

        return offsetted;
    },

    formatResetLinkDurationEmail(durationStr: string): string {
        const value = parseInt(durationStr, 10) || 15;
        const unit = durationStr.slice(-1).toLowerCase();

        const unitMap: Record<string, string> = {
            s: "seconds",
            m: "minutes",
            h: "hours",
            d: "days",
        };

        return `${value} ${unitMap[unit] || "minutes"}`;
    },
};

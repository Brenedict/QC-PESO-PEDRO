const PH_OFFSET = 8;

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
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();

        const startDate = new Date(Date.UTC(year, month, day, startHour - PH_OFFSET, 0, 0, 0));

        const endDate = new Date(Date.UTC(year, month, day, endHour - PH_OFFSET, 59, 59, 999));

        return { startDate, endDate };
    },
    buildWeekRange(date: Date) {
        const currentDay = date.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
        const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;

        const monday = new Date(
            Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate() + distanceToMonday,
                -PH_OFFSET,
                0,
                0,
                0
            )
        );

        const friday = new Date(
            Date.UTC(
                monday.getUTCFullYear(),
                monday.getUTCMonth(),
                monday.getUTCDate() + 4,
                23 - PH_OFFSET,
                59,
                59,
                999
            )
        );

        return { startDate: monday.toISOString(), endDate: friday.toISOString() };
    },

    buildMonthRange(date: Date) {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();

        const startDate = new Date(Date.UTC(year, month, 1, -PH_OFFSET, 0, 0, 0));
        const endDate = new Date(Date.UTC(year, month + 1, 0, 23 - PH_OFFSET, 59, 59, 999));

        return { startDate, endDate };
    },
};

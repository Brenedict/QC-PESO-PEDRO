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
};

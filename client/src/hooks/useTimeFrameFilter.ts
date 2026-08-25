import { useCallback, useState } from "react";
import { useSearchParamsTable } from "../hooks/table";
import { getTimeframeRange } from "../api/dateService";

export type Timeframe = "overall" | "day" | "week" | "month" | "year" | "custom";

export type TimeframeFilter = ReturnType<typeof useTimeframeFilter>;

function toDateInputValue(value: string | Date) {
    const date = new Date(value);

    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");
}

export function useTimeframeFilter(defaultTimeframe: Timeframe = "overall") {
    const { searchParams } = useSearchParamsTable();

    const [timeframe, setTimeframe] = useState<Timeframe>((searchParams.timeframe ?? defaultTimeframe) as Timeframe);
    const [startDate, setStartDate] = useState(() => searchParams.startDate ?? "");
    const [endDate, setEndDate] = useState(() => searchParams.endDate ?? "");

    const handleTimeframeChange = useCallback((newTimeframe: string) => {
        const timeframe = newTimeframe as Timeframe;

        if (timeframe === "custom") {
            setTimeframe("custom");
            return;
        }

        const range = getTimeframeRange(timeframe);

        if (!range) {
            setTimeframe("overall");
            setStartDate("");
            setEndDate("");
            return;
        }

        setTimeframe(timeframe);
        setStartDate(toDateInputValue(range.startDate));
        setEndDate(toDateInputValue(range.endDate));
    }, []);

    const handleStartDateChange = useCallback(
        (value: string) => {
            if (endDate && value > endDate) {
                return;
            }

            setTimeframe("custom");
            setStartDate(value);
        },
        [endDate]
    );

    const handleEndDateChange = useCallback(
        (value: string) => {
            if (startDate && value < startDate) {
                return;
            }

            setTimeframe("custom");
            setEndDate(value);
        },
        [startDate]
    );

    const isTimeframeChanged = useCallback(() => {
        return startDate !== (searchParams.startDate ?? "") || endDate !== (searchParams.endDate ?? "");
    }, [startDate, endDate, searchParams.startDate, searchParams.endDate]);

    return {
        timeframe,
        startDate,
        endDate,
        handleTimeframeChange,
        handleStartDateChange,
        handleEndDateChange,
        isTimeframeChanged,
    };
}

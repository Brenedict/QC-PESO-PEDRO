import type { ChartOptions, TooltipItem } from "chart.js";
import { ChartColorClasses } from "../types/charts";
import {
    sampleContextDoughnutOptions,
    sampleLineOptions,
    samplePieOptions,
    samplePopupBarOptions,
} from "../data/chartsConfigs";
import type { AnalyticsData, BreakdownData } from "./analyticsRequests";

// ------------------------ CHARTS ------------------------------------------
export const buildCategoryChartData = (
    rawData: AnalyticsData,
    series: CategorySeriesConfig[],
    sourceKey: string,
    chartType: "pie" | "doughnut" = "pie"
) => {
    const grouped = rawData?.[sourceKey].grouped as Record<string, number> | undefined;
    const values = series.map(({ key }) => grouped?.[key] ?? 0);
    const hasData = values.some((v) => v > 0);

    const baseOptions = chartType === "doughnut" ? sampleContextDoughnutOptions : samplePieOptions;

    const options: ChartOptions<"pie" | "doughnut"> = {
        ...baseOptions,
        plugins: {
            ...baseOptions.plugins,
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<"pie" | "doughnut">) => {
                        if (!hasData) return "No data";
                        return `${context.label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    return {
        options,
        data: {
            labels: series.map((s) => s.label),
            datasets: [
                {
                    data: hasData ? values : series.map(() => 1),
                    backgroundColor: series.map((s) => ChartColorClasses[s.opaqueColor]),
                    borderColor: series.map((s) => ChartColorClasses[s.color]),
                },
            ],
        },
    };
};

export const buildTimeSeriesChartData = (
    rawData: AnalyticsData,
    series: TimeSeriesConfig[],
    sourceKey: string,
    presetKey: keyof typeof bucketPresets,
    chartType: "line" | "bar" = "line"
) => {
    const breakdownData = rawData[sourceKey] as BreakdownData;
    const { getBuckets, formatLabel } = bucketPresets[presetKey];
    const bucketKeys = getBuckets();

    const dataByBucket = bucketKeys.map((bucketKey) => {
        const bucketValue = breakdownData[bucketKey];
        const values = series.reduce(
            (acc, { key }) => {
                acc[key] = typeof bucketValue === "number" ? bucketValue : bucketValue?.[key];
                return acc;
            },
            {} as Record<string, number | undefined>
        );
        return { bucketKey, values };
    });

    const labels = dataByBucket.map((d) => formatLabel(d.bucketKey));

    return {
        options: chartType === "bar" ? samplePopupBarOptions : sampleLineOptions,
        data: {
            labels,
            datasets: series.map(({ key, label, color, opaqueColor }) => ({
                label,
                data: dataByBucket.map((d) => d.values[key] ?? 0),
                borderColor: ChartColorClasses[color],
                backgroundColor: ChartColorClasses[color],
                ...(chartType === "line"
                    ? {
                          tension: 0.4,
                          fill: { target: "origin", above: ChartColorClasses[opaqueColor] },
                      }
                    : {}),
            })),
        },
    };
};

// ------------------------ TYPES ------------------------------------------

export type CategorySeriesConfig = {
    key: string;
    label: string;
    color: keyof typeof ChartColorClasses;
    opaqueColor: keyof typeof ChartColorClasses;
};

export type TimeSeriesConfig = {
    key: string;
    label: string;
    color: keyof typeof ChartColorClasses;
    opaqueColor: keyof typeof ChartColorClasses;
};

// ------------------------ HELPER FUNCTIONS ---------------------------------------

const getCurrentWeekdayBuckets = (): string[] => {
    const now = new Date();
    const monday = new Date(now);
    const day = monday.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    monday.setDate(monday.getDate() + diff);

    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d.toISOString().slice(0, 10); // "2026-08-17"
    });
};

const getCurrentMonthWeekBuckets = (): string[] => {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const day = firstOfMonth.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(firstOfMonth);
    monday.setDate(firstOfMonth.getDate() + diff);

    return Array.from({ length: 4 }, (_, i) => {
        const weekStart = new Date(monday);
        weekStart.setDate(monday.getDate() + i * 7);
        return weekStart.toISOString().slice(0, 10); // "2026-08-03"
    });
};

const getCurrentYearMonthBuckets = (): string[] => {
    const now = new Date();
    const year = now.getFullYear();
    return Array.from({ length: 12 }, (_, i) => `${year}-${String(i + 1).padStart(2, "0")}`); // "2026-01".."2026-12"
};

const getHourlyBuckets = (): string[] => {
    return Array.from({ length: 10 }, (_, i) => String(i + 8).padStart(2, "0")); // "08".."17"
};

const bucketPresets = {
    hourly: {
        getBuckets: getHourlyBuckets,
        formatLabel: (h: string) => {
            const date = new Date();
            date.setHours(Number(h), 0, 0, 0);
            return new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: true }).format(date);
        },
    },
    daily: {
        getBuckets: getCurrentWeekdayBuckets,
        formatLabel: (d: string) =>
            new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(`${d}T00:00:00`)),
    },
    weekly: {
        getBuckets: getCurrentMonthWeekBuckets,
        formatLabel: (d: string) => `Week of ${d}`,
    },
    monthly: {
        getBuckets: getCurrentYearMonthBuckets,
        formatLabel: (m: string) =>
            new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(`${m}-01T00:00:00`)),
    },
} satisfies Record<string, { getBuckets: () => string[]; formatLabel: (key: string) => string }>;

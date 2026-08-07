import { ChartColorClasses } from "../types/charts";

export const sampleBarContextOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: "bottom",
            align: "center",
            labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 10,
            },
        },
        title: {
            display: false,
            text: "Chart Example",
            position: "top",
            align: "center",
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 45,
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
} as const;

// This is the most basic format for the `data` argument of the chart
export const sampleLineData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
        {
            label: "Walk-ins",
            data: [45, 12, 109, 66, 255],
            borderColor: ChartColorClasses["light-blue"],
            backgroundColor: ChartColorClasses["light-blue"],
            tension: 0.4,
            fill: {
                target: "origin" as const,
                above: ChartColorClasses["light-blue-opaque"],
            },
        },
        {
            label: "Online Referral",
            data: [90, 80, 10, 160, 255],
            borderColor: ChartColorClasses["primary-blue"],
            backgroundColor: ChartColorClasses["primary-blue"],
            tension: 0.4,
            fill: {
                target: "origin" as const,
                above: ChartColorClasses["primary-blue-opaque"],
            },
        },
        {
            label: "Inhouse Referral",
            data: [190, 30, 12, 42, 0],
            borderColor: ChartColorClasses["red"],
            backgroundColor: ChartColorClasses["red"],
            tension: 0.4,
            fill: {
                target: "origin" as const,
                above: ChartColorClasses["red-opaque"],
            },
        },
    ],
};

// This is the most basic format for the `options` argument of the chart
export const sampleLineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
            align: "center",
            labels: {
                usePointStyle: true, // Changes box to a circle/point style
                boxWidth: 10,
                padding: 30,
            },
        },
        title: {
            display: false,
            text: "Weekly Transaction Volume",
            position: "top",
            align: "center",
        },
    },
} as const;

export const samplePieData = {
    labels: ["Female", "Male"],
    datasets: [
        {
            label: "# of Votes",
            data: [67, 33],
            backgroundColor: [ChartColorClasses["pink-opaque"], ChartColorClasses["light-blue-opaque"]],
            borderColor: [ChartColorClasses["pink"], ChartColorClasses["light-blue"]],
        },
    ],
};

// This is the most basic format for the `options` argument of the chart
export const samplePieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
            align: "center",
            labels: {
                usePointStyle: true, // Changes box to a circle/point style
                boxWidth: 10,
                padding: 30,
            },
        },
        title: {
            display: false,
            text: "Gender Split",
            position: "top",
            align: "center",
        },
    },
} as const;

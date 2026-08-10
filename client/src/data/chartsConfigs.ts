import { ChartColorClasses } from "../types/charts";

// === SAMPLE BAR ARGS ===

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

export const samplePopupBarOptions = {
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
                stepSize: 10,
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
} as const;

export const samplePopupBarData = {
    labels: ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"],
    datasets: [
        {
            label: "Total Transactions",
            data: [10, 20, 40, 35, 9, 45, 20, 34, 5],
            backgroundColor: ChartColorClasses["primary-blue"],
        },
    ],
};

export const sampleReportsBarData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
        {
            label: "Total Transactions",
            data: [90, 130, 110, 70, 40],
            backgroundColor: ChartColorClasses["primary-blue"],
        },
    ],
};

export const sampleReportsBarOptions = {
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

// === SAMPLE LINE ARGS ===

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

// === SAMPLE PIE ARGS ===

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

// === SAMPLE SCATTER ARGS ===

export const sampleScatterOptions = {
    responsive: true,
    scales: {
        x: {
            type: "category" as const,
            labels: ["Normal", "Slow Internet", "Heavy Rain", "System Downtime"], // <-- 4. Define acceptable string options
            position: "bottom" as const,
            title: {
                display: true,
                text: "X Axis Value",
            },
        },
        y: {
            title: {
                display: true,
                text: "Y Axis Value",
            },
        },
    },
    plugins: {
        legend: {
            position: "top" as const,
            display: false,
        },
    },
};

export const sampleScatterData = {
    datasets: [
        {
            label: "Dataset A",
            data: [
                { x: "Normal", y: 120 },
                { x: "Slow Internet", y: 48 },
                { x: "Heavy Rain", y: 94 },
                { x: "System Downtime", y: 12 },
                { x: "Troublesome Applicants", y: 67 },
                { x: "Unresponsive Staff", y: 37 },
                { x: "Sickness", y: 2 },
                { x: "Other", y: 100 },
            ],
            backgroundColor: ChartColorClasses["pink"],
        },
    ],
};

type alignTypes = "start" | "center" | "end";
type positionTypes = "top" | "bottom" | "left" | "right";

export const ChartColorClasses = {
    black: "#000",
    "primary-blue": "#004b87",
    "primary-blue-opaque": "#004b877a",
    red: "#ef4444",
    "red-opaque": "#ef44447a",
    green: "#10b981",
    "green-opaque": "#10b9817a",
    "light-blue": "#38bdf8",
    "light-blue-opaque": "#38bdf87a",
    pink: "#f472b6",
    "pink-opaque": "#f472b67a",
} as const;

export type ChartColorVariant = (typeof ChartColorClasses)[keyof typeof ChartColorClasses];

interface Dataset {
    label?: string; // Data label
    data: number[]; // Actual Data values
    borderColor?: ChartColorVariant | ChartColorVariant[]; // Legend Border Color
    backgroundColor: ChartColorVariant | ChartColorVariant[]; // Legend Fill Color
    tension?: number; // Chart smoothness (e.g. smooth line chart)
    fill?: {
        target?: "origin";
        above?: ChartColorVariant; // Fill Color under line chart
    };
}

export interface ChartData {
    labels: string[];
    datasets: Dataset[];
}

export interface ChartConfigs {
    responsive: boolean;
    plugins: {
        legend: {
            display?: boolean;
            position?: positionTypes;
            align?: alignTypes;
            labels?: {
                usePointStyle: boolean; // Makes legend circular
                pointStyle?: "circle"; // Additional config to ensure circular legend
                boxWidth: number;
                padding?: number; // Space of legend from graph
            };
        };
        title?: {
            display: boolean;
            text: string;
            position?: positionTypes;
            align?: alignTypes;
        };
    };
    scales?: {
        // y axis configurations
        y?: {
            ticks: {
                stepSize: number; // Interval of y-axis
            };
        };
        x?: {
            grid: {
                display: false; // Removes vertical grid lines
            };
        };
    };
}

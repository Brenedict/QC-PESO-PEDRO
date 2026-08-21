type alignTypes = "start" | "center" | "end";
type positionTypes = "top" | "bottom" | "left" | "right";

export const ChartColorClasses = {
    black: "#000000",
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
    purple: "#818cf8",
    "purple-opaque": "#818cf87a",
    yellow: "#f59e0b",
    "yellow-opaque": "#f59e0b7a",
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
    maintainAspectRatio?: boolean;
    plugins: {
        legend: {
            display?: boolean;
            position?: positionTypes;
            align?: alignTypes;
            labels?: {
                usePointStyle: boolean;
                pointStyle?: "circle";
                boxWidth: number;
                padding?: number;
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
        y?: {
            beginAtZero?: boolean; // Added to fix scatter options
            title?: {
                // Added to fix scatter options
                display: boolean;
                text: string;
            };
            ticks?: {
                stepSize: number;
            };
        };
        x?: {
            type?: string; // Added to fix scatter options
            labels?: string[]; // Added to fix scatter options
            position?: string; // Added to fix scatter options
            title?: {
                // Added to fix scatter options
                display: boolean;
                text: string;
            };
            grid?: {
                display: boolean;
            };
        };
    };
}

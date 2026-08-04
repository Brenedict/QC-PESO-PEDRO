type alignTypes = "start" | "center" | "end";
type positionTypes = "top" | "bottom" | "left" | "right";
interface Dataset {
    label?: string;
    data: number[];
    borderColor: string | string[];
    backgroundColor: string | string[];
    tension?: number;
    fill?: {
        target?: "origin";
        above?: string;
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
            position?: positionTypes;
            align?: alignTypes;
            labels?: {
                usePointStyle: boolean;
                pointStyle: "circle";
                boxWidth: number;
                padding?: number;
            };
        };
        title: {
            display: boolean;
            text: string;
            position?: positionTypes;
            align?: alignTypes;
        };
    };
}

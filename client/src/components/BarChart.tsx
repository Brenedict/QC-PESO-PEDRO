// General Imports
import type { ComponentProps } from "react";
import { Bar } from "react-chartjs-2";

// Chart JS specific import
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

type BarChartProps = ComponentProps<typeof Bar>;

export function BarChart({ options, data, ...props }: BarChartProps) {
    return <Bar options={options} data={data} {...props} />;
}

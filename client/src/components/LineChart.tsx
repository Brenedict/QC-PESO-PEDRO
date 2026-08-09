// General Imports
import type { ComponentProps } from "react";
import { Line } from "react-chartjs-2";

// Chart JS specific import
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

type LineChartProps = ComponentProps<typeof Line>;

export function LineChart({ options, data, ...props }: LineChartProps) {
    return <Line options={options} data={data} {...props} />;
}

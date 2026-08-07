// General Imports
import type { ComponentProps } from "react";
import { Line } from "react-chartjs-2";

// Types
import type { ChartConfigs, ChartData } from "../types/charts";

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

interface CustomLineChartProps extends LineChartProps {
    options: ChartConfigs;
    data: ChartData;
}

export function LineChart({ options, data, ...props }: CustomLineChartProps) {
    return <Line options={options} data={data} {...props} />;
}

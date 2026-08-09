// General Imports
import type { ComponentProps } from "react";
import { Scatter } from "react-chartjs-2";

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

type ScatterChartProps = ComponentProps<typeof Scatter>;

export function ScatterChart({ options, data, ...props }: ScatterChartProps) {
    return <Scatter options={options} data={data} {...props} />;
}

// General Imports
import type { ComponentProps } from "react";
import { Pie } from "react-chartjs-2";

// Chart JS specific import
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

type PieChartProps = ComponentProps<typeof Pie>;

export function PieChart({ options, data, ...props }: PieChartProps) {
    return <Pie options={options} data={data} {...props} />;
}

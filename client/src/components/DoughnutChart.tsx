// General Imports
import type { ComponentProps } from "react";
import { Doughnut } from "react-chartjs-2";

// Chart JS specific import
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

type DoughnutChartProps = ComponentProps<typeof Doughnut>;

export function DoughnutChart({ options, data, ...props }: DoughnutChartProps) {
    return <Doughnut options={options} data={data} {...props} />;
}

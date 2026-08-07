// General Imports
import type { ComponentProps } from "react";
import { Pie } from "react-chartjs-2";

// Types
import type { ChartConfigs, ChartData } from "../types/charts";

// Chart JS specific import
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

type PieChartProps = ComponentProps<typeof Pie>;

interface CustomPieChartProps extends PieChartProps {
    options: ChartConfigs;
    data: ChartData;
}

export function PieChart({ options, data, ...props }: CustomPieChartProps) {
    return <Pie options={options} data={data} {...props} />;
}

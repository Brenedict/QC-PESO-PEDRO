// General Imports
import type { ComponentProps } from "react";
import { Doughnut } from "react-chartjs-2";

// Types
import type { ChartConfigs, ChartData } from "../types/charts";

// Chart JS specific import
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

type DoughnutChartProps = ComponentProps<typeof Doughnut>;

interface CustomDoughnutChartProps extends DoughnutChartProps {
    options: ChartConfigs;
    data: ChartData;
}

export function DoughnutChart({ options, data, ...props }: CustomDoughnutChartProps) {
    return <Doughnut options={options} data={data} {...props} />;
}

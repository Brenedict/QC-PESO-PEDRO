// General Imports
import type { ComponentProps } from "react";
import { Bar } from "react-chartjs-2";

// Components
import { Card } from "./Card";

// Types
import type { ChartConfigs, ChartData } from "../types/charts";

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

interface CustomBarChartProps extends BarChartProps {
    options: ChartConfigs;
    data: ChartData;
}

export function BarChart({ options, data, ...props }: CustomBarChartProps) {
    return (
        <Card>
            <Card.Body>
                <Bar options={options} data={data} {...props} />
            </Card.Body>
        </Card>
    );
}

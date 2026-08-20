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
type BarChartProps = ComponentProps<typeof Bar> & { wrapperClassName?: string };

export function BarChart({ options, data, wrapperClassName = "relative w-full h-full min-h-[250px]", ...props}: BarChartProps) {
    const responsiveOptions = {
        ...(options as object),
        maintainAspectRatio: false,
    };

    return (
        <div className={wrapperClassName}>
            <Bar options={responsiveOptions} data={data} {...props} />
        </div>
    );
}
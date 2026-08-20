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

type LineChartProps = ComponentProps<typeof Line> & { wrapperClassName?: string };

export function LineChart({ options, data, wrapperClassName = "relative w-full h-full min-h-[250px]", ...props}: LineChartProps) {
    const responsiveOptions = {
        ...(options as object),
        maintainAspectRatio: false,
    };

    return (
        <div className={wrapperClassName}>
            <Line options={responsiveOptions} data={data} {...props} />
        </div>
    );
}

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

type ScatterChartProps = ComponentProps<typeof Scatter> & { wrapperClassName?: string };

export function ScatterChart({ options, data, wrapperClassName = "relative w-full h-full min-h-[250px]", ...props }: ScatterChartProps) {
    const responsiveOptions = {
        ...(options as object),
        maintainAspectRatio: false,
    };

    return (
        <div className={wrapperClassName}>
            <Scatter options={options} data={data} {...props} />
        </div>
    );
}

// General Imports
import type { ComponentProps } from "react";
import { Doughnut } from "react-chartjs-2";

// Chart JS specific import
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

type DoughnutChartProps = ComponentProps<typeof Doughnut> & { wrapperClassName?: string };

export function DoughnutChart({ options, data, wrapperClassName = "relative w-full h-full min-h-[250px]", ...props}: DoughnutChartProps) {
    const responsiveOptions = {
        ...(options as object),
        maintainAspectRatio: false,
    };

    return (
        <div className={wrapperClassName}>
            <Doughnut options={responsiveOptions} data={data} {...props} />
        </div>
    );
}

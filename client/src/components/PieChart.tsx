// General Imports
import type { ComponentProps } from "react";
import { Pie } from "react-chartjs-2";

// Chart JS specific import
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

type PieChartProps = ComponentProps<typeof Pie> & { wrapperClassName?: string };

export function PieChart({ options, data, wrapperClassName = "relative w-full h-full min-h-[250px]", ...props }: PieChartProps) {
    
    const responsiveOptions = {
        ...(options as object),
        maintainAspectRatio: false,
    };
    return (
        <div className={wrapperClassName}>
            <Pie options={responsiveOptions} data={data} {...props} />
        </div>
    );
}

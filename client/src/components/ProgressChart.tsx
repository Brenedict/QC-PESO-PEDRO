import { ColorClasses, type ColorVariant } from "../types/common";
import { Text } from "./Text";

interface ProgressDataItem {
    item: string;
    percentage: number;
    barColor: ColorVariant;
}

interface ProgressChartProp {
    dataset: ProgressDataItem[];
}

export function ProgressChart({ dataset }: ProgressChartProp) {
    return (
        <aside className="w-full flex flex-col gap-4">
            {dataset.map(({ item, percentage, barColor }, index) => {
                return (
                    <section id={`${index}`} className="flex flex-col gap-2">
                        <section className="w-full flex justify-between">
                            <Text size="description">{item ? item : "-"}</Text>
                            <Text size="description" variant="grayish-blue" align="right">{`${percentage}%`}</Text>
                        </section>
                        <div className="bg-off-white rounded-full overflow-hidden border-1 border-off-white-border">
                            <div
                                className={`${ColorClasses[barColor].bg} h-2.5`}
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </section>
                );
            })}
        </aside>
    );
}

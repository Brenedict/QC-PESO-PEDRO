import { Card } from "../components/Card";
import { Text } from "../components/Text";
import { ProgressChart } from "../components/ProgressChart";
import { DoughnutChart } from "../components/DoughnutChart";
import { samplePieData, samplePieOptions } from "../data/overviewCharts";
import { BarChart } from "../components/BarChart";
import { smapleBarData } from "./Reports";
import { sampleBarContextOptions } from "../data/overviewCharts";
export function ProgressChartGraph() {
    return (
        <Card className="col-span-2">
            <Card.Header bordered={false} variant="white">
                <Text weight="bold">Most Common Reasons for Mismatched Skills</Text>
            </Card.Header>
            <Card.Body className="">
                <ProgressChart
                    dataset={[
                        { item: "Education Mismatch", percentage: 30, barColor: "light-blue" },
                        { item: "Lack of NC II Certification", percentage: 80, barColor: "pink" },
                        { item: "No Relevant Experience", percentage: 30, barColor: "primary-blue" },
                        { item: "Incomplete Resume", percentage: 80, barColor: "black" },
                    ]}
                />
            </Card.Body>
        </Card>
    );
}

export function DoughnutChartGraph() {
    return (
        <Card className="col-span-1">
            <Card.Header bordered={false} variant="white">
                <Text weight="bold">Operational Conditions Distribution</Text>
            </Card.Header>
            <Card.Body className="h-fit">
                <DoughnutChart options={samplePieOptions} data={samplePieData} height="250px"></DoughnutChart>
            </Card.Body>
        </Card>
    );
}

export function BarChartGraph() {
    return (
        <Card className="col-span-2">
            <Card.Header bordered={false}>
                <Text weight="bold">Transaction Summary Preview</Text>
            </Card.Header>
            <Card.Body>
                <BarChart options={sampleBarContextOptions} data={smapleBarData} height={"60px"}></BarChart>
            </Card.Body>
        </Card>
    );
}

export function ContextAnalysis() {
    return (
        <section className="grid grid-cols-3">
            <ProgressChartGraph />
            <DoughnutChartGraph />
            <BarChartGraph />
        </section>
    );
}

// Components
import { Card } from "../components/Card";
import { Text } from "../components/Text";
import { ProgressChart } from "../components/ProgressChart";
import { DoughnutChart } from "../components/DoughnutChart";
import { BarChart } from "../components/BarChart";
import { ScatterChart } from "../components/ScatterChart";
import PageHeader from "../components/PageHeader";
import type { IconProps } from "../components/Icon";
import { LineChart } from "../components/LineChart";
import Icon from "../components/Icon";

// Icons
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

// Test Data
import {
    sampleContextBarData,
    sampleContextBarOptions,
    sampleContextLineData,
    sampleContextLineOptions,
    sampleContextDoughnut1Data,
    sampleContextDoughnutOptions,
    sampleContextDoughnut2Data,
} from "../data/chartsConfigs";
import { sampleScatterData, sampleScatterOptions } from "../data/chartsConfigs";

// Types
import type { MaterialIcon } from "../types/common";

function StatCard({
    value,
    subValue = null,
    description,
    valueVariant = "dark-blue",
    invertOrder = false,
    align = "center",
    dropShadow = true,
}: {
    description: string;
    value: any;
    subValue?: any;
    valueVariant?: "dark-blue" | "red" | "green";
    invertOrder?: boolean;
    align?: "left" | "center" | "right";
    dropShadow?: boolean;
}) {
    const alignClasses = {
        left: "items-start",
        center: "items-center",
        right: "items-end",
    };

    return (
        <Card className="w-full flex-1" dropShadow={dropShadow}>
            <Card.Body className={`p-6! flex ${alignClasses[align]} ${invertOrder ? "flex-col-reverse" : "flex-col"}`}>
                <div className="flex justify-center items-center gap-1">
                    {/* Main Text */}
                    <Text size="big" variant={valueVariant} weight="bold">
                        {value}
                    </Text>

                    {/* Percentage */}
                    {subValue && (
                        <Text size="description" weight="normal" variant="grayish-blue">
                            ({subValue})
                        </Text>
                    )}
                </div>
                <Text size="small" variant="grayish-blue" weight="normal">
                    {description}
                </Text>
            </Card.Body>
        </Card>
    );
}

function ContextTipCard({ icon, description }: { icon: MaterialIcon; description: string }) {
    return (
        <Card dropShadow={false}>
            <Card.Body className="flex gap-4 px-4!" variant="off-white">
                <div>
                    <Icon
                        icon={icon}
                        size="big"
                        variant="primary-blue"
                        align="center"
                        bg={{ variant: "grayish-blue-opaque", type: "normal", padding: "big" }}
                    />
                </div>
                <Text size="description" variant="dark-blue">
                    {description}
                </Text>
            </Card.Body>
        </Card>
    );
}

function EventTimelineCard({ title, reporter, time }: { title: string; reporter: string; time: string }) {
    return (
        <Card>
            <Card.Body variant="off-white">
                <div className="flex">
                    <Text size="small" weight="bold" className="flex-1">
                        {title}
                    </Text>
                    <Text size="smaller" variant="grayish-blue" weight="normal">
                        {time}
                    </Text>
                </div>
                <Text size="smaller" variant="grayish-blue" weight="normal" font="default">
                    Reported by {reporter}
                </Text>
            </Card.Body>
        </Card>
    );
}

function SectionHeader({
    primaryText,
    secondaryText,
    icon,
    divider = true,
}: {
    primaryText: string;
    secondaryText?: string;
    icon?: IconProps;
    divider?: boolean;
}) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-2">
                <Text
                    size="medium"
                    weight="bold"
                    variant="dark-blue"
                    svg={icon ? { ...icon, position: "left", gap: "big" } : undefined}
                >
                    {primaryText}
                </Text>
                <Text size="small" weight="normal" variant="grayish-blue">
                    {secondaryText}
                </Text>
            </div>
            {divider && <hr className="border-1.2 border-grayish-blue-opaque mb-4" />}
        </div>
    );
}

function InsightSection() {
    return (
        <Card className="border-3 border-primary-blue">
            <Card.Body>
                <SectionHeader
                    primaryText="Context Analytics"
                    icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
                    divider={false}
                ></SectionHeader>

                {/* Should probably use map function */}
                <div className="grid grid-cols-5 gap-3 mb-6">
                    <StatCard
                        value={427}
                        description="Total Transactions"
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                    ></StatCard>
                    <StatCard
                        value={"Walk-In"}
                        description="Primary Source"
                        subValue={"39%"}
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                    ></StatCard>
                    <StatCard
                        value={"Successful"}
                        description="Most Common Outcome"
                        subValue={"74%"}
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                    ></StatCard>
                    <StatCard
                        value={"Slow Internet"}
                        description="Most Frequent Issue"
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                        valueVariant="red"
                    ></StatCard>
                    <StatCard
                        value={"Lack of NC II"}
                        description="Most Common Skill Gap"
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                    ></StatCard>
                </div>

                <Card dropShadow={false}>
                    <Card.Body variant="off-white">
                        <Text size="description" variant="dark-blue" weight="bold">
                            AI Recommendation:
                        </Text>
                        <Text size="description" variant="grayish-blue" weight="normal">
                            Increase support staff during Job Caravan events and coordinate with IT to resolve recurring
                            internet issues, as days affected by connectivity problems consistently process 28% fewer
                            applicants.
                        </Text>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    );
}

function Level1Section() {
    return (
        <section>
            <SectionHeader
                primaryText="Context Analytics"
                secondaryText="Where did applicants come from?"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            ></SectionHeader>

            <div className="grid grid-cols-6 gap-3 mb-6">
                <StatCard value={38} description="Walk-in Referral"></StatCard>
                <StatCard value={197} description="Online Referral"></StatCard>
                <StatCard value={175} description="Inhouse Recruitment"></StatCard>
                <StatCard value={198} description="Partner Agencies"></StatCard>
                <StatCard value={44} description="Immersion"></StatCard>
                <StatCard value={216} description="PESO Referral"></StatCard>
            </div>

            <div className="grid grid-cols-6 gap-6">
                {/* Doughnut Chart */}
                <Card className="col-span-2">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Applicant Source Distribution</Text>
                    </Card.Header>
                    <Card.Body className="h-fit">
                        <DoughnutChart
                            options={sampleContextDoughnutOptions}
                            data={sampleContextDoughnut1Data}
                            height="250px"
                        ></DoughnutChart>
                    </Card.Body>
                </Card>

                {/* Line Chart */}
                <Card className="col-span-4">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Transaction Summary Preview</Text>
                    </Card.Header>
                    <Card.Body>
                        <LineChart
                            options={sampleContextLineOptions}
                            data={sampleContextLineData}
                            height="60px"
                        ></LineChart>
                    </Card.Body>
                    <Card.Footer bordered={false} variant="white">
                        <ContextTipCard
                            icon={LightbulbOutlinedIcon}
                            description={
                                "Job Caravan contributed 41% of today's applicants. Notice the sudden spike on Wednesday, perfectly correlating with the off-site event."
                            }
                        />
                    </Card.Footer>
                </Card>
            </div>
        </section>
    );
}

function Level2Section() {
    return (
        <section>
            <SectionHeader
                primaryText="Context Analytics"
                secondaryText="Where did applicants come from?"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            ></SectionHeader>
            <div className="grid grid-cols-6 gap-6">
                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Outcomes by Applicant Source</Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={sampleContextBarData}
                            height="180px"
                        ></BarChart>
                    </Card.Body>
                </Card>

                {/* Progress Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Most Common Reasons for Mismatched Skills</Text>
                    </Card.Header>
                    <Card.Body className="">
                        <ProgressChart
                            dataset={[
                                { item: "Education Mismatch", percentage: 58, barColor: "primary-blue" },
                                { item: "Lack of NC II Certification", percentage: 21, barColor: "light-blue" },
                                { item: "No Relevant Experience", percentage: 14, barColor: "purple" },
                                { item: "Incomplete Resume", percentage: 7, barColor: "yellow" },
                            ]}
                        />
                    </Card.Body>
                    <Card.Footer bordered={false} variant="white">
                        <ContextTipCard
                            icon={LightbulbOutlinedIcon}
                            description={
                                "Most pending applications today were caused by incomplete documentary requirements, while the top skill gap remains NC II Certification."
                            }
                        />
                    </Card.Footer>
                </Card>
            </div>
        </section>
    );
}

function Level3Section() {
    return (
        <section>
            <SectionHeader
                primaryText="Operational Environment"
                secondaryText="The reason productivity changed"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            ></SectionHeader>
            <div className="grid grid-cols-6 gap-6">
                {/* Doughnut Chart */}
                <Card className="col-span-2">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Applicant Source Distribution</Text>
                    </Card.Header>
                    <Card.Body className="flex flex-col gap-3">
                        <div className="w-full">
                            <DoughnutChart
                                options={sampleContextDoughnutOptions}
                                data={sampleContextDoughnut2Data}
                                height={"250px"}
                            ></DoughnutChart>
                        </div>
                        <hr className="border-1.2 border-grayish-blue-opaque" />
                        <Text size="description" weight="bold">
                            Event Timeline
                        </Text>

                        {/* Use Map function here */}
                        <div className="flex flex-col gap-3 overflow-y-auto  h-40">
                            <EventTimelineCard title="Slow Internet" reporter="Staff A" time="8:45 AM" />
                            <EventTimelineCard title="Slow Internet" reporter="Staff A" time="8:45 AM" />
                            <EventTimelineCard title="Slow Internet" reporter="Staff A" time="8:45 AM" />
                            <EventTimelineCard title="Slow Internet" reporter="Staff A" time="8:45 AM" />
                            <EventTimelineCard title="Slow Internet" reporter="Staff A" time="8:45 AM" />
                        </div>
                    </Card.Body>
                </Card>

                {/* Scatter Chart */}
                <Card className="col-span-4">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Correlation: Operational Issue vs Transactions Processed</Text>
                    </Card.Header>
                    <Card.Body>
                        <ScatterChart options={sampleScatterOptions} data={sampleScatterData}></ScatterChart>
                    </Card.Body>
                    <Card.Footer bordered={false} variant="white">
                        <ContextTipCard
                            icon={LightbulbOutlinedIcon}
                            description={
                                "Days with Slow Internet processed approximately 28% fewer applicants. System Downtime completely halts throughput, dropping the average to just 40 transactions."
                            }
                        />
                    </Card.Footer>
                </Card>
            </div>
        </section>
    );
}

export function ContextAnalytics() {
    return (
        <>
            <PageHeader
                primaryText="Transaction Outcome"
                secondaryText="Quality of transactions and skill gaps"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            />

            <main className="flex flex-col gap-6">
                <InsightSection />
                <Level1Section />
                <Level2Section />
                <Level3Section />
            </main>
        </>
    );
}

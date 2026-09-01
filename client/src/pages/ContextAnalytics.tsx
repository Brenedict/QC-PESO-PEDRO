// General Imports
import { useState } from "react";
import { Outlet } from "react-router-dom";

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
import Button from "../components/Button";

// Icons
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

// Default Chart configs
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
import { apiJson, ensureOk } from "../api/actionService";
import { DASHBOARD_OVERVIEW_REQUEST } from "../api/analyticsService";

function StatCard({
    value,
    subValue,
    description,
    valueVariant = "dark-blue",
    invertOrder = false,
    align = "center",
    dropShadow = true,
}: {
    description: string;
    value: string | number;
    subValue?: string | number;
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

function ContextTipCard({
    icon,
    description,
    variant = "off-white",
}: {
    icon: MaterialIcon;
    description: string;
    variant?: "white" | "off-white";
}) {
    return (
        <Card dropShadow={false}>
            <Card.Body className="flex gap-4 px-4!" variant={variant}>
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

                <h1>Last Month</h1>
                {/* Should probably use map function */}
                <div className="grid grid-cols-4 gap-3 mb-6">
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
                        description="Most Frequent Tag"
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                        valueVariant="red"
                    ></StatCard>
                </div>

                <h1>This Month</h1>
                <div className="grid grid-cols-4 gap-3 mb-6">
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
                        description="Most Frequent Tag"
                        invertOrder={true}
                        align="left"
                        dropShadow={false}
                        valueVariant="red"
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
                primaryText="Level 1: Transaction Origin"
                secondaryText="Where did applicants come from?"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            ></SectionHeader>
            <div className="grid grid-cols-5 gap-3 mb-6">
                <h1>Previous Month</h1>
                <div className="col-span-5 grid grid-cols-3 gap-3">
                    <StatCard value={38} description="Walk-in Referral"></StatCard>
                    <StatCard value={197} description="Online Referral"></StatCard>
                    <StatCard value={175} description="Inhouse Recruitment"></StatCard>
                </div>
                <h1>This Month</h1>
                <div className="col-span-5 grid grid-cols-3 gap-3">
                    <StatCard value={38} description="Walk-in Referral"></StatCard>
                    <StatCard value={197} description="Online Referral"></StatCard>
                    <StatCard value={175} description="Inhouse Recruitment"></StatCard>
                </div>
                <div className="col-span-5">
                    <ContextTipCard
                        icon={LightbulbOutlinedIcon}
                        variant="white"
                        description={
                            "Job Caravan contributed 41% of today's applicants. Notice the sudden spike on Wednesday, perfectly correlating with the off-site event."
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function Level2Section() {
    return (
        <section>
            <SectionHeader
                primaryText="Level 2: Transaction Outcome"
                secondaryText="Quality of transactions and skill gaps"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            ></SectionHeader>
            <div className="grid grid-cols-6 gap-6">
                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Last Month: Outcomes by Applicant Source</Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={sampleContextBarData}
                            wrapperClassName="relative w-full h-[350px]!"
                        ></BarChart>
                    </Card.Body>
                </Card>

                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">This Month: Outcomes by Applicant Source</Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={sampleContextBarData}
                            wrapperClassName="relative w-full h-[350px]!"
                        ></BarChart>
                    </Card.Body>
                </Card>
                <div className="col-span-6">
                    <ContextTipCard
                        icon={LightbulbOutlinedIcon}
                        variant="white"
                        description={
                            "Job Caravan contributed 41% of today's applicants. Notice the sudden spike on Wednesday, perfectly correlating with the off-site event."
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function Level3Section() {
    return (
        <section>
            <SectionHeader
                primaryText="Level 3: Operational Environment"
                secondaryText="What is the frequent issues in the working environment?"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            ></SectionHeader>
            <div className="grid grid-cols-6 gap-6">
                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">Last Month: Tags Mentioned By Staff</Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={sampleContextBarData}
                            wrapperClassName="relative w-full h-[350px]!"
                        ></BarChart>
                    </Card.Body>
                </Card>

                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text weight="bold">This Month: Tags Mentioned By Staff</Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={sampleContextBarData}
                            wrapperClassName="relative w-full h-[350px]!"
                        ></BarChart>
                    </Card.Body>
                </Card>
                <div className="col-span-6">
                    <ContextTipCard
                        icon={LightbulbOutlinedIcon}
                        variant="white"
                        description={
                            "Job Caravan contributed 41% of today's applicants. Notice the sudden spike on Wednesday, perfectly correlating with the off-site event."
                        }
                    />
                </div>
            </div>
        </section>
    );
}

export function ContextAnalytics() {
    const [generateInsights, setGenerateInsights] = useState(true);
    const [tempInsights, setTempInsights] = useState("");

    const handleGenerateInsights = async () => {
        try {
            const res = await apiJson(`/insight/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(DASHBOARD_OVERVIEW_REQUEST()),
            });

            await ensureOk(res, "Failed to generate insights");

            const result = await res.json();

            console.log("Insights generated successfully:", result);
            setTempInsights(result.insight);
            setGenerateInsights(true);

            return;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return (
        <>
            <PageHeader
                primaryText="Transaction Outcome"
                secondaryText="Quality of transactions and skill gaps"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            />
            {generateInsights == false ? (
                <main className="flex flex-col gap-6">
                    <Button onClick={handleGenerateInsights}>Generate</Button>
                </main>
            ) : (
                <main className="flex flex-col gap-6">
                    {/* <h1 className="font-bold">This is temporary unformatted ai reply</h1>
                    <h1>{tempInsights}</h1> */}
                    <InsightSection />
                    <Level1Section />
                    <Level2Section />
                    <Level3Section />
                </main>
            )}
            <Outlet />
        </>
    );
}

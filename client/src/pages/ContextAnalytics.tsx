// General Imports
import { useEffect, useRef, useState } from "react";
import { Outlet, useLoaderData } from "react-router";

// Components
import { Card } from "../components/Card";
import { Text } from "../components/Text";
import { BarChart } from "../components/BarChart";
import PageHeader from "../components/PageHeader";
import type { IconProps } from "../components/Icon";
import Icon from "../components/Icon";
import Button from "../components/Button";

// Icons
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

// Default Chart configs
import { sampleContextBarOptions } from "../data/chartsConfigs";

// Types
import type { MaterialIcon } from "../types/common";
import { apiJson, ensureOk } from "../api/actionService";
import { DASHBOARD_OVERVIEW_REQUEST } from "../api/analyticsService";
import { formatLabel } from "../utils/text";
import { ChartColorClasses } from "../types/charts";
import { findMostFrequent } from "../api/contextService";
import { EnvironmentTag } from "@qcpesopedro/shared/prisma/browser";

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
                    <Text size="bigMedium" variant={valueVariant} weight="bold">
                        {value}
                    </Text>

                    {/* Percentage */}
                    {subValue && (
                        <Text size="description" weight="medium" variant="grayish-blue">
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
            <div className="flex items-center gap-3 mb-4">
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

function InsightsStatGrid({
    transactionCount,
    types,
    outcomes,
    tags,
    shiftCount,
}: {
    transactionCount: number;
    types: Record<string, number> | undefined;
    outcomes: Record<string, number> | undefined;
    tags: Array<{ environmentTag: string; count: number }>;
    shiftCount: number;
}) {
    const primarySource = findMostFrequent(types);
    const commonOutcome = findMostFrequent(outcomes);
    const frequentTag = tags.length > 0 ? tags.reduce((max, tag) => (tag.count > max.count ? tag : max)) : null;
    const tagPercentage = shiftCount > 0 && frequentTag ? Math.round((frequentTag.count / shiftCount) * 100) : 0;

    return (
        <div className="grid grid-cols-4 gap-3 mb-6">
            <StatCard
                value={transactionCount}
                description="Total Transactions"
                invertOrder={true}
                align="left"
                dropShadow={false}
            />
            <StatCard
                value={primarySource && primarySource.percent > 0 ? formatLabel(primarySource.name) : "N/A"}
                description="Primary Source"
                subValue={primarySource && primarySource.percent > 0 ? `${primarySource.percent}%` : undefined}
                invertOrder={true}
                align="left"
                dropShadow={false}
            />
            <StatCard
                value={commonOutcome && commonOutcome.percent > 0 ? formatLabel(commonOutcome.name) : "N/A"}
                description="Most Common Outcome"
                subValue={commonOutcome && commonOutcome.percent > 0 ? `${commonOutcome.percent}%` : undefined}
                invertOrder={true}
                align="left"
                dropShadow={false}
            />
            <StatCard
                value={frequentTag && tagPercentage > 0 ? formatLabel(frequentTag.environmentTag) : "N/A"}
                description="Most Frequent Tag"
                subValue={frequentTag && tagPercentage > 0 ? `${tagPercentage}%` : undefined}
                invertOrder={true}
                align="left"
                dropShadow={false}
                valueVariant="red"
            />
        </div>
    );
}

function InsightSection({ insight }: { insight: string }) {
    const { transaction, shift } = useLoaderData();

    const { types, outcomes } = transaction;
    const { analytics } = shift ?? {};

    const lastMonthTags = analytics
        ? analytics.map((tag: { environmentTag: string; previous: number }) => ({
              environmentTag: tag.environmentTag,
              count: tag.previous,
          }))
        : [];

    const thisMonthTags = analytics
        ? analytics.map((tag: { environmentTag: string; count: number }) => ({
              environmentTag: tag.environmentTag,
              count: tag.count,
          }))
        : [];

    return (
        <Card className="border-3 border-primary-blue mb-8">
            <Card.Body>
                <SectionHeader
                    primaryText="Context Analytics"
                    icon={{ variant: "primary-blue", icon: QuickreplyOutlinedIcon, size: "big" }}
                    divider={false}
                />

                <Text size="normal" variant="primary-blue" weight="bold" className="mb-1">
                    Last Month
                </Text>
                <InsightsStatGrid
                    transactionCount={types?.previous?.count ?? 0}
                    types={types?.previous?.grouped}
                    outcomes={outcomes?.previous?.grouped}
                    tags={lastMonthTags}
                    shiftCount={shift?.total ?? 0}
                />

                <Text size="normal" variant="primary-blue" weight="bold" className="mb-1">
                    This Month
                </Text>
                <InsightsStatGrid
                    transactionCount={types?.current?.count ?? 0}
                    types={types?.current?.grouped}
                    outcomes={outcomes?.current?.grouped}
                    tags={thisMonthTags}
                    shiftCount={shift?.total ?? 0}
                />

                <Card dropShadow={false}>
                    <Card.Body variant="off-white">
                        <Text size="description" variant="dark-blue" weight="bold">
                            AI Recommendation:
                        </Text>
                        <Text size="description" variant="grayish-blue" weight="normal">
                            {insight}
                        </Text>
                    </Card.Body>
                </Card>
            </Card.Body>
        </Card>
    );
}

function Level1Section({ insight }: { insight: string }) {
    const {
        transaction: { types },
    } = useLoaderData();

    const sourceCards = (grouped: Record<string, number> | undefined) => (
        <div className="col-span-5 grid grid-cols-3 gap-3">
            <StatCard value={grouped?.WALK_IN_REFERRAL ?? 0} description="Walk-in Referral" />
            <StatCard value={grouped?.ONLINE_REFERRAL ?? 0} description="Online Referral" />
            <StatCard value={grouped?.IN_HOUSE_RECRUITMENT ?? 0} description="Inhouse Recruitment" />
        </div>
    );

    return (
        <section className="mb-12">
            <SectionHeader
                primaryText="Level 1: Transaction Origin"
                secondaryText="Where did applicants come from?"
                icon={{ variant: "primary-blue", icon: LocationOnOutlinedIcon, size: "big" }}
            />
            <Text size="normal" variant="primary-blue" weight="bold" className="mb-1">
                Last Month
            </Text>
            {sourceCards(types?.previous?.grouped)}
            <Text size="normal" variant="primary-blue" weight="bold" className="mb-1 mt-4">
                This Month
            </Text>
            {sourceCards(types?.current?.grouped)}
            <div className="col-span-5 mt-5">
                <ContextTipCard icon={LightbulbOutlinedIcon} variant="white" description={insight} />
            </div>
        </section>
    );
}

function Level2Section({ insight }: { insight: string }) {
    const {
        transaction: {
            walkinoutcomes: { current: currentWalkins, previous: previousWalkins },
            onlineoutcomes: { current: currentOnline, previous: previousOnline },
            inhouseoutcomes: { current: currentInhouse, previous: previousInhouse },
        },
    } = useLoaderData();

    type GroupedData = { grouped?: Record<string, number> };
    const buildOutcomesData = (walkins?: GroupedData, online?: GroupedData, inhouse?: GroupedData) => ({
        labels: ["Walk-In Referral", "Online Referral", "Inhouse Recruitment"],
        datasets: [
            {
                label: "Successful",
                data: [walkins?.grouped?.SUCCESS ?? 0, online?.grouped?.SUCCESS ?? 0, inhouse?.grouped?.SUCCESS ?? 0],
                backgroundColor: ChartColorClasses["green"],
            },
            {
                label: "Pending",
                data: [walkins?.grouped?.PENDING ?? 0, online?.grouped?.PENDING ?? 0, inhouse?.grouped?.PENDING ?? 0],
                backgroundColor: ChartColorClasses["light-blue"],
            },
            {
                label: "Mismatched",
                data: [
                    walkins?.grouped?.MISMATCH ?? 0,
                    online?.grouped?.MISMATCH ?? 0,
                    inhouse?.grouped?.MISMATCH ?? 0,
                ],
                backgroundColor: ChartColorClasses["red"],
            },
            {
                label: "None",
                data: [walkins?.grouped?.NONE ?? 0, online?.grouped?.NONE ?? 0, inhouse?.grouped?.NONE ?? 0],
                backgroundColor: ChartColorClasses["yellow"],
            },
        ],
    });

    const lastMonthData = buildOutcomesData(previousWalkins, previousOnline, previousInhouse);
    const thisMonthData = buildOutcomesData(currentWalkins, currentOnline, currentInhouse);

    return (
        <section className="mb-12">
            <SectionHeader
                primaryText="Level 2: Transaction Outcome"
                secondaryText="Quality of transactions and skill gaps"
                icon={{ variant: "primary-blue", icon: TrackChangesOutlinedIcon, size: "big" }}
            ></SectionHeader>
            <div className="grid grid-cols-6 gap-6">
                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text size="normal" variant="primary-blue" weight="bold">
                            Last Month: Outcomes by Applicant Source
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={lastMonthData}
                            wrapperClassName="relative w-full h-[350px]!"
                        ></BarChart>
                    </Card.Body>
                </Card>

                {/* Bar Chart */}
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text size="normal" variant="primary-blue" weight="bold">
                            This Month: Outcomes by Applicant Source
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={thisMonthData}
                            wrapperClassName="relative w-full h-[350px]!"
                        ></BarChart>
                    </Card.Body>
                </Card>
                <div className="col-span-6">
                    <ContextTipCard icon={LightbulbOutlinedIcon} variant="white" description={insight} />
                </div>
            </div>
        </section>
    );
}

function Level3Section({ insight }: { insight: string }) {
    const {
        shift: { analytics },
    } = useLoaderData();

    const getTag = (key: string) => analytics?.find((tag: { environmentTag: string }) => tag.environmentTag === key);

    const tagMap = {
        slowInternet: getTag(EnvironmentTag.SLOW_INTERNET),
        brokenEquipment: getTag(EnvironmentTag.BROKEN_EQUIPMENT),
        heavyRain: getTag(EnvironmentTag.HEAVY_RAIN),
        feelingUnwell: getTag(EnvironmentTag.FEELING_UNWELL),
        brokenSoftware: getTag(EnvironmentTag.BROKEN_SOFTWARE_SYSTEM),
        applicantIssues: getTag(EnvironmentTag.APPLICANT_ISSUES),
    } as const;

    const buildTagsData = (key: "count" | "previous") => ({
        labels: [
            "Slow Internet",
            "Broken Equipment",
            "Heavy Rain",
            "Feeling Unwell",
            "Broken Software",
            "Applicant Issues",
        ],
        datasets: [
            {
                label: "Number of Tagged Shifts",
                data: [
                    tagMap.slowInternet?.[key] ?? 0,
                    tagMap.brokenEquipment?.[key] ?? 0,
                    tagMap.heavyRain?.[key] ?? 0,
                    tagMap.feelingUnwell?.[key] ?? 0,
                    tagMap.brokenSoftware?.[key] ?? 0,
                    tagMap.applicantIssues?.[key] ?? 0,
                ],
                backgroundColor: ChartColorClasses["primary-blue"],
            },
        ],
    });

    const lastMonthData = buildTagsData("previous");
    const thisMonthData = buildTagsData("count");

    return (
        <section>
            <SectionHeader
                primaryText="Level 3: Operational Environment"
                secondaryText="What is the frequent issues in the working environment?"
                icon={{ variant: "primary-blue", icon: ReportGmailerrorredOutlinedIcon, size: "big" }}
            />
            <div className="grid grid-cols-6 gap-6">
                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text size="normal" variant="primary-blue" weight="bold">
                            Last Month: Tags Mentioned By Staff
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={lastMonthData}
                            wrapperClassName="relative w-full h-[350px]!"
                        />
                    </Card.Body>
                </Card>

                <Card className="col-span-3">
                    <Card.Header bordered={false} variant="white">
                        <Text size="normal" variant="primary-blue" weight="bold">
                            This Month: Tags Mentioned By Staff
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <BarChart
                            options={sampleContextBarOptions}
                            data={thisMonthData}
                            wrapperClassName="relative w-full h-[350px]!"
                        />
                    </Card.Body>
                </Card>
                <div className="col-span-6">
                    <ContextTipCard icon={LightbulbOutlinedIcon} variant="white" description={insight} />
                </div>
            </div>
        </section>
    );
}

export function ContextAnalytics() {
    const analytics = useLoaderData();
    const [insights, setInsights] = useState<Record<string, string>>({});
    const hasGeneratedInsights = useRef(false);

    useEffect(() => {
        if (hasGeneratedInsights.current) return;
        hasGeneratedInsights.current = true;

        const focus = {
            summary:
                "Synthesize the other focus areas into the single most important takeaway for PESO management this month, then give one concrete, actionable recommendation. Do not repeat a point already made in another paragraph verbatim.",
            level1: "Analyze referral source trends, volumes, and spikes across Walk-In Referral, Online Referral, and In-House Recruitment.",
            level2: "Analyze outcome quality by source (Success, Pending, Mismatch, None), highlighting skill gaps or mismatches.",
            level3: "Analyze operational environment tag frequency (Slow Internet, Broken Equipment, Heavy Rain, etc.) and how these issues affect throughput.",
        };

        const generateInsights = async () => {
            try {
                const res = await apiJson(`/insight/`, {
                    method: "POST",
                    body: JSON.stringify({ analytics, focus }),
                });

                await ensureOk(res, "Failed to generate insights");

                const result = await res.json();

                console.log("Insights generated successfully:", result);
                setInsights(result.insights);
            } catch (err) {
                console.error(err);
            }
        };
        generateInsights();
    }, [analytics]);

    return (
        <>
            <PageHeader
                primaryText="Transaction Outcome"
                secondaryText="Quality of transactions and skill gaps"
                icon={{ variant: "primary-blue", icon: QueryStatsIcon, size: "bigger" }}
            />

            <main className="flex flex-col">
                {/* <h1 className="font-bold">This is temporary unformatted ai reply</h1>
                    <h1>{tempInsights}</h1> */}
                <InsightSection insight={insights.summary ?? "Gathering insights..."} />
                <Level1Section insight={insights.level1 ?? "Gathering insights..."} />
                <Level2Section insight={insights.level2 ?? "Gathering insights..."} />
                <Level3Section insight={insights.level3 ?? "Gathering insights..."} />
            </main>

            <Outlet />
        </>
    );
}

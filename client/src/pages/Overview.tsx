// General Imports
import { Outlet, useLoaderData } from "react-router";
import { type ReactNode } from "react";

// Components
import PageHeader from "../components/PageHeader";
import { Text } from "../components/Text";
import { StatsCard } from "../components/StatsCard";
import { RecentActivity } from "../components/RecentActivity";
import { LineChart } from "../components/LineChart";
import { PieChart } from "../components/PieChart";
import Button from "../components/Button";
import { NumberText, NumberTitle } from "../components/DashboardCard";
import { Card } from "../components/Card";
import Icon from "../components/Icon";

// Icons
import SsidChartOutlinedIcon from "@mui/icons-material/SsidChartOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// Test Data
import { sampleLineData, sampleLineOptions, samplePieData, samplePieOptions } from "../data/chartsConfigs";
import { recentActivity } from "../data/recentActivity";

// Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

// Context
import { useTopBar } from "../context/TopbarContext.tsx";
import {
    buildLineWeekData,
    buildSexChartWeekData,
    CARD_MAP,
    DASHBOARD_OVERVIEW_REQUEST,
    getQueryIds,
    type MetricData,
} from "../api/analyticsRequests.ts";

type CardId = keyof typeof CARD_MAP;

interface CardGroupProps {
    ids?: CardId[];
    data: Record<CardId, MetricData | undefined>;
}

function OverviewSection({ children }: { children: ReactNode }) {
    return <section className="mt-8">{children}</section>;
}

function CardGroup({ ids = [], data }: CardGroupProps) {
    // For some reason ayaw gumana ng string substitute kaya eto nag array ako
    // Palitan nyo nalang kung maayos niyo
    const navigate = useNavigateDefault();
    const columnClass = ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];
    const cardCol = Math.min(ids.length, 4);

    return (
        <>
            <hr className="mt-2 border-0 bg-off-white-border h-0.5" />
            <section className={`grid ${columnClass[cardCol - 1]} gap-6 mt-4`}>
                {ids.map((id) => (
                    <StatsCard
                        key={id}
                        className="w-full"
                        title={CARD_MAP?.[id].title}
                        specialIcon={CARD_MAP?.[id].specialIcon}
                        total={data?.[id]?.current?.count ?? 0}
                        male={data?.[id]?.current?.grouped?.MALE ?? 0}
                        female={data?.[id]?.current?.grouped?.FEMALE ?? 0}
                        previous={data?.[id]?.previous?.count ?? 0}
                        onClick={() => navigate(ROUTES.dashboard.preview(id))}
                    />
                ))}
            </section>
        </>
    );
}

function DailyTransactions() {
    const data = useLoaderData();
    const ids = getQueryIds(DASHBOARD_OVERVIEW_REQUEST, 0, 5) as string[];

    return <CardGroup ids={ids} data={data} />;
}

function ApplicantsDemographics() {
    const data = useLoaderData();
    const ids = getQueryIds(DASHBOARD_OVERVIEW_REQUEST, 5, 9) as string[];

    return <CardGroup ids={ids} data={data} />;
}

function EmploymentOutcomes() {
    const data = useLoaderData();
    const ids = getQueryIds(DASHBOARD_OVERVIEW_REQUEST, 9, 13) as string[];

    return <CardGroup ids={ids} data={data} />;
}

function EmploymentEvents() {
    return null;
    // return (
    //     <CardGroup>
    //         <JobFairParticipants {...jobFairData} />
    //         <AccreditationCard {...accreditationData} />
    //         <WHIPCard {...WHIPData} />
    //     </CardGroup>
    // );
}

function EndShiftValue({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div>
            <NumberText className="text-big text-center!" align="center">
                {children}
            </NumberText>
            <NumberTitle className="text-center!">{title}</NumberTitle>
        </div>
    );
}

function VerticalDivider() {
    return <div className="h-full w-0.5 bg-dark-blue border-0" />;
}

interface EndShiftProps {
    pending: number;
    approved: number;
    revision: number;
}

function EndShiftVerification({ pending, approved, revision }: EndShiftProps) {
    return (
        <Card>
            <Card.Body className="bg-white p-5! flex justify-between">
                <section className="flex gap-4 w-fit items-center">
                    {/* Left Part */}
                    <Icon
                        variant="white"
                        icon={FindInPageOutlinedIcon}
                        size="big"
                        bg={{ variant: "primary-blue", padding: "big", type: "normal" }}
                    />
                    <div>
                        <Text variant="dark-blue" align="left" weight="bold" size="medium">
                            End of Shift Verification
                        </Text>
                        <Text variant="grayish-blue" size="description" weight="normal">
                            Verify frontline encoder submissions for today.
                        </Text>
                    </div>
                </section>
                {/*Middle Part*/}
                <section className="w-fit flex gap-4">
                    <EndShiftValue title="pending">{pending}</EndShiftValue>
                    <VerticalDivider />
                    <EndShiftValue title="approved">{approved}</EndShiftValue>
                    <VerticalDivider />
                    <EndShiftValue title="revision">{revision}</EndShiftValue>
                </section>

                {/*Right Part*/}
                <section className="flex justify-end items-center">
                    <Button leftIcon={{ icon: SearchOutlinedIcon, variant: "white", align: "left", size: "big" }}>
                        View All
                    </Button>
                </section>
            </Card.Body>
        </Card>
    );
}

// Main Overview Component
export function Overview({ pending, approved, revision }: EndShiftProps) {
    const { role } = useTopBar();
    const data = useLoaderData();

    const weekly = buildLineWeekData(data);
    const sex = buildSexChartWeekData(data);

    return (
        <>
            <PageHeader primaryText="Overview" secondaryText="Welcome back. Here's what's happening today.">
                <Button
                    size="small"
                    variant="white-black"
                    leftIcon={{ icon: SsidChartOutlinedIcon, size: "medium", variant: "primary-blue" }}
                >
                    Generate Report
                </Button>
            </PageHeader>

            {(role === "ADMIN" || role === "SUPERADMIN") && (
                <EndShiftVerification {...{ pending, approved, revision }} />
            )}

            <OverviewSection>
                <Text size="medium" weight="bold" variant="primary-blue">
                    Daily Transactions
                </Text>
                <DailyTransactions />
            </OverviewSection>

            <OverviewSection>
                <Text size="medium" weight="bold" variant="primary-blue">
                    Applicant Demographics
                </Text>

                <ApplicantsDemographics />
            </OverviewSection>

            <OverviewSection>
                <Text size="medium" weight="bold" variant="primary-blue">
                    Employment Outcomes
                </Text>
                <EmploymentOutcomes />
            </OverviewSection>

            {/* <OverviewSection>
                <Text size="medium" weight="bold" variant="primary-blue">
                    Employment Events
                </Text> 

                <EmploymentEvents />
            </OverviewSection> */}

            <OverviewSection>
                <section className="grid grid-cols-3 gap-6">
                    <Card className="col-span-2">
                        <Card.Header bordered={false} variant="white">
                            <Text weight="bold">Weekly Transaction Volume</Text>
                        </Card.Header>
                        <Card.Body>
                            <LineChart options={weekly.options} data={weekly.data} height={"100px"}></LineChart>
                        </Card.Body>
                    </Card>
                    <Card className="col-span-1">
                        <Card.Header bordered={false} variant="white">
                            <Text weight="bold">Gender Split</Text>
                        </Card.Header>
                        <Card.Body>
                            <PieChart options={sex.options} data={sex.data} height={"250px"}></PieChart>
                        </Card.Body>
                    </Card>
                </section>
            </OverviewSection>

            <br className="block mb-14" />

            <RecentActivity items={recentActivity} onViewAll={() => alert("View all clicked")} />

            {/* Popup Uses */}
            <Outlet />
        </>
    );
}

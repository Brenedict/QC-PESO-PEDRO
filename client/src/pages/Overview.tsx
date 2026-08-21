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
import { DASHBOARD_CARD_MAP, RECENT_TRANSACTION_MAP } from "../api/transactionService.ts";

// Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

// Context
import { useTopBar } from "../context/TopbarContext.tsx";
import {
    DASHBOARD_OVERVIEW_REQUEST,
    getQueryIds,
    type AnalyticsData,
    type DateRangeData,
} from "../api/analyticsRequests.ts";
import {
    buildCategoryChartData,
    buildTimeSeriesChartData,
    type CategorySeriesConfig,
    type TimeSeriesConfig,
} from "../api/chartService.ts";
import type { Transaction, User } from "@qcpesopedro/shared/prisma/browser.ts";
import { formatTime } from "../utils/time.ts";

type CardId = keyof typeof DASHBOARD_CARD_MAP;

interface CardGroupProps {
    ids?: CardId[];
    analytics: AnalyticsData;
}

function OverviewSection({ children }: { children: ReactNode }) {
    return <section className="mt-8">{children}</section>;
}

function CardGroup({ ids = [], analytics }: CardGroupProps) {
    // For some reason ayaw gumana ng string substitute kaya eto nag array ako
    // Palitan nyo nalang kung maayos niyo
    const navigate = useNavigateDefault();
    const columnClass = ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];
    const cardCol = Math.min(ids.length, 4);

    return (
        <>
            <hr className="mt-2 border-0 bg-off-white-border h-0.5" />
            <section className={`grid ${columnClass[cardCol - 1]} gap-6 mt-4`}>
                {ids.map((id) => {
                    const dataValue = analytics?.[id] as DateRangeData | undefined;
                    if (typeof dataValue?.current?.grouped === "number") return null;

                    return (
                        <StatsCard
                            key={id}
                            className="w-full"
                            title={DASHBOARD_CARD_MAP?.[id].title}
                            specialIcon={DASHBOARD_CARD_MAP?.[id].specialIcon}
                            total={dataValue?.current?.count ?? 0}
                            male={dataValue?.current?.grouped?.MALE ?? 0}
                            female={dataValue?.current?.grouped?.FEMALE ?? 0}
                            previous={dataValue?.previous?.count ?? 0}
                            onClick={() => navigate(ROUTES.dashboard.preview(id))}
                        />
                    );
                })}
            </section>
        </>
    );
}

function DailyTransactions() {
    const { analytics } = useLoaderData();
    const ids = getQueryIds(DASHBOARD_OVERVIEW_REQUEST, 0, 5) as string[];

    return <CardGroup ids={ids} analytics={analytics} />;
}

function ApplicantsDemographics() {
    const { analytics } = useLoaderData();
    const ids = getQueryIds(DASHBOARD_OVERVIEW_REQUEST, 5, 9) as string[];

    return <CardGroup ids={ids} analytics={analytics} />;
}

function EmploymentOutcomes() {
    const { analytics } = useLoaderData();
    const ids = getQueryIds(DASHBOARD_OVERVIEW_REQUEST, 9, 13) as string[];

    return <CardGroup ids={ids} analytics={analytics} />;
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
    const navigate = useNavigateDefault();
    const { role } = useTopBar();
    const { analytics, recent } = useLoaderData();

    const referralSeries: TimeSeriesConfig[] = [
        { key: "WALK_IN_REFERRAL", label: "Walk-ins", color: "light-blue", opaqueColor: "light-blue-opaque" },
        { key: "ONLINE_REFERRAL", label: "Online Referral", color: "primary-blue", opaqueColor: "primary-blue-opaque" },
        { key: "IN_HOUSE_RECRUITMENT", label: "Inhouse Referral", color: "red", opaqueColor: "red-opaque" },
    ];

    const sexSeries: CategorySeriesConfig[] = [
        { key: "MALE", label: "Male", color: "light-blue", opaqueColor: "light-blue-opaque" },
        { key: "FEMALE", label: "Female", color: "pink", opaqueColor: "pink-opaque" },
    ];

    const recentActivity = recent?.transactions.map((transaction: Transaction & { user: User }) => ({
        id: transaction.id,
        title: RECENT_TRANSACTION_MAP[transaction.transactionType],
        subject: transaction.applicantFullName,
        processedBy: `${transaction.user.firstName} ${transaction.user.lastName}`,
        timestamp: formatTime(new Date(transaction.createdAt)),
        status: transaction.transactionOutcome,
    }));

    const daily = buildTimeSeriesChartData(analytics, referralSeries, "weekly-breakdown", "daily");
    const sex = buildCategoryChartData(analytics, sexSeries, "sex");

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
                            <LineChart options={daily.options} data={daily.data} wrapperClassName="h-100!"></LineChart>
                        </Card.Body>
                    </Card>
                    <Card className="col-span-1">
                        <Card.Header bordered={false} variant="white">
                            <Text weight="bold">Gender Split</Text>
                        </Card.Header>
                        <Card.Body>
                            <PieChart options={sex.options} data={sex.data} wrapperClassName="h-90!"></PieChart>
                        </Card.Body>
                    </Card>
                </section>
            </OverviewSection>

            <br className="block mb-14" />

            <RecentActivity items={recentActivity} onViewAll={() => navigate(ROUTES.history.root)} />

            {/* Popup Uses */}
            <Outlet />
        </>
    );
}

import PageHeader from "../components/PageHeader";
import { Text } from "../components/Text";
import { StatsCard } from "../components/StatsCard";
import { JobFairParticipants } from "../components/JobFairParticipants";
import { AccreditationCard } from "../components/AccreditationCard";
import { WHIPCard } from "../components/WHIPCard";
import {
    accreditationData,
    applicantCards,
    dailyTransactionCards,
    employmentOutcomeCards,
    jobFairData,
    WHIPData,
} from "../data/overviewDashboard";
import { Children, type ReactNode } from "react";
import Button from "../components/Button";
import SsidChartOutlinedIcon from "@mui/icons-material/SsidChartOutlined";
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import type { Role } from "../types/common";
import { NumberText, NumberTitle } from "../components/DashboardCard";

import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function OverviewSection({ children }: { children: ReactNode }) {
    return <section className="mt-8">{children}</section>;
}

function CardGroup({ children }: { children: ReactNode }) {
    // For some reason ayaw gumana ng string substitute kaya eto nag array ako
    // Palitan nyo nalang kung maayos niyo
    const columnClass = ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];
    const cardCol = Math.min(Children.count(children), 4);

    return (
        <>
            <hr className="mt-2 border-0 bg-off-white-border h-0.5" />
            <section className={`grid ${columnClass[cardCol - 1]} gap-6 mt-4`}>{children}</section>
        </>
    );
}

function DailyTransactions() {
    return (
        <CardGroup>
            {dailyTransactionCards.map((card) => (
                <StatsCard key={card.title} className="w-full" {...card} />
            ))}
        </CardGroup>
    );
}

function ApplicantsDemographics() {
    return (
        <CardGroup>
            {applicantCards.map((card) => (
                <StatsCard key={card.title} className="w-full" {...card} />
            ))}
        </CardGroup>
    );
}

function EmploymentOutcomes() {
    return (
        <CardGroup>
            {employmentOutcomeCards.map((card) => (
                <StatsCard key={card.title} className="w-full" {...card} />
            ))}
        </CardGroup>
    );
}

function EmploymentEvents() {
    return (
        <CardGroup>
            <JobFairParticipants {...jobFairData} />
            <AccreditationCard {...accreditationData} />
            <WHIPCard {...WHIPData} />
        </CardGroup>
    );
}

function EndShiftValue({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div>
            <NumberText className="text-big text-center!">{children}</NumberText>
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
export function Overview({ role = "frontline", pending, approved, revision }: { role?: Role } & EndShiftProps) {
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

            {role === "admin" && <EndShiftVerification {...{ pending, approved, revision }} />}

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

            <OverviewSection>
                <Text size="medium" weight="bold" variant="primary-blue">
                    Employment Events
                </Text>

                <EmploymentEvents />
            </OverviewSection>
        </>
    );
}

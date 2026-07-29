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

// Main Overview Component
export function Overview() {
    return (
        <>
            <PageHeader
                primaryText="Overview"
                secondaryText="Welcome back. Here's what's happening today."
            ></PageHeader>

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

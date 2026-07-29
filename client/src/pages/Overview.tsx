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

function DailyTransactions() {
    return (
        <div className="grid grid-cols-5 gap-6">
            {dailyTransactionCards.map((card) => (
                <StatsCard key={card.title} className="w-full" {...card} />
            ))}
        </div>
    );
}

function ApplicantsDemographics() {
    return (
        <div className="grid grid-cols-3 gap-6">
            {applicantCards.map((card) => (
                <StatsCard key={card.title} className="w-full" {...card} />
            ))}
        </div>
    );
}

function EmploymentOutcomes() {
    return (
        <div className="grid grid-cols-3 gap-6">
            {employmentOutcomeCards.map((card) => (
                <StatsCard key={card.title} className="w-full" {...card} />
            ))}
        </div>
    );
}

function EmploymentEvents() {
    return (
        <div className="grid grid-cols-3 gap-6">
            <JobFairParticipants {...jobFairData} />
            <AccreditationCard {...accreditationData} />
            <WHIPCard {...WHIPData} />
        </div>
    );
}

// Main Overview Component
export function Overview() {
    return (
        <div className="m-6">
            <PageHeader
                primaryText="Overview"
                secondaryText="Welcome back. Here's what's happening today."
            ></PageHeader>

            <section>
                <Text size="medium" weight="bold" variant="primary-blue">
                    Daily Transactions
                </Text>
                <DailyTransactions />
            </section>

            <section className="border-t border-gray-200 pt-6 mt-8">
                <Text size="medium" weight="bold" variant="primary-blue">
                    Applicant Demographics
                </Text>

                <ApplicantsDemographics />
            </section>

            <section className="border-t border-gray-200 pt-6 mt-8">
                <Text size="medium" weight="bold" variant="primary-blue">
                    Employment Outcomes
                </Text>
                <EmploymentOutcomes />
            </section>

            <section className="border-t border-gray-200 pt-6 mt-8">
                <Text size="medium" weight="bold" variant="primary-blue">
                    Employment Events
                </Text>

                <EmploymentEvents />
            </section>
        </div>
    );
}

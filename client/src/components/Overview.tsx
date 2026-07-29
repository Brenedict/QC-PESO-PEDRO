import PageHeader from "./PageHeader";
import { Text } from "./Text";
import { StatsCard } from "./StatsCard";
import { JobFairParticipants } from "./JobFairParticipants";
import { AccreditationCard } from "./AccreditationCard";
import { WHIPCard } from "./WHIPCard";

//DATA
const dailyTransactionCards = [
    {
        title: "Total Transactions",
        total: 142,
        male: 82,
        female: 60,
        change: "↗ +12% vs Yesterday",
        isPositive: true,
    },
    {
        title: "Walk ins",
        total: 48,
        male: 26,
        female: 22,
        change: "↗ 5% vs Yesterday",
        isPositive: true,
    },
    {
        title: "Online Referrals",
        total: 31,
        male: 18,
        female: 13,
        change: "",
        isPositive: true,
    },
    {
        title: "in-house Referrals",
        total: 17,
        male: 8,
        female: 9,
        change: "",
        isPositive: true,
    },
    {
        title: "Other inqueries",
        total: 12,
        male: 6,
        female: 6,
        change: "",
        isPositive: true,
    },
];

const applicantCards = [
    {
        title: "First Time Job Seekers",
        total: 41,
        male: 19,
        female: 22,
        change: "↘ -2% vs Yesterday",
        isPositive: false,
    },
    {
        title: "PWD",
        total: 9,
        male: 5,
        female: 4,
        change: "",
        isPositive: false,
    },
    {
        title: "Senior Citizens",
        total: 11,
        male: 4,
        female: 7,
        change: "",
        isPositive: false,
    },
];

const employmentOutcomeCards = [
    {
        title: "Successful Referrals",
        total: 84,
        male: 45,
        female: 39,
        change: "↗ +8% vs Yesterday",
        isPositive: true,
    },
    {
        title: "Pending Applications",
        total: 12,
        male: 7,
        female: 5,
        change: "",
        isPositive: true,
    },
    {
        title: "Mismatched Skills",
        total: 6,
        male: 4,
        female: 2,
        change: "",
        isPositive: true,
    },
];
//EMPLOYMENT EVENTS DATA
const jobFairData = {
    title: "Job Fair Participants",
    registered: 160,
    registeredMale: 88,
    registeredFemale: 72,
    hired: 58,
    hiredMale: 34,
    hiredFemale: 24,
};

const accreditationData = {
    title: "Accreditation",
    total: 24,
    newCount: 14,
    renewalCount: 10,
};

const WHIPData = {
    title: "WHIP",
    totalparticipants: 112,
    male: 62,
    female: 50,
};

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

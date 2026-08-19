import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

import type { TransactionAnalyticsQueryInput } from "@qcpesopedro/shared/schema/transactions";
import { buildDayRangeParam, buildWeekRangeParam } from "./actionService";
import type { MaterialIcon } from "../types/common";
import { sampleLineData } from "../data/chartsConfigs";
import { ChartColorClasses } from "../types/charts";

export interface MetricData {
    current?: {
        count?: number;
        grouped?: {
            MALE?: number;
            FEMALE?: number;
        };
    };
    previous?: {
        count?: number;
    };
}

type BreakdownData = Record<string, Record<string, Record<string, number>>>;

const TODAY_PARAM = buildDayRangeParam(new Date());
const WEEK_PARAM = buildWeekRangeParam(new Date());

export const CARD_MAP: Record<string, { title: string; specialIcon?: MaterialIcon }> = {
    total: { title: "Total Transaction" },
    "walk-in": { title: "Walk-in Transaction" },
    online: { title: "Online Referral" },
    "in-house": { title: "In-house Referral" },
    "work-immersion": { title: "Work Immersion", specialIcon: BusinessCenterOutlinedIcon },
    "job-seeker": { title: "First Time Job Seekers", specialIcon: AssignmentIndOutlinedIcon },
    pwd: { title: "Persons With Disability", specialIcon: AssignmentIndOutlinedIcon },
    senior: { title: "Senior Citizens", specialIcon: AssignmentIndOutlinedIcon },
    ["young-worker"]: { title: "Young Workers", specialIcon: AssignmentIndOutlinedIcon },
    ["success"]: { title: "Successful Referrals", specialIcon: BusinessCenterOutlinedIcon },
    ["pending"]: { title: "Pending Applications", specialIcon: FindInPageOutlinedIcon },
    ["mismatch"]: { title: "Mismatched Skills", specialIcon: FindInPageOutlinedIcon },
    ["none"]: { title: "None", specialIcon: FindInPageOutlinedIcon },
} as const;

export const DASHBOARD_OVERVIEW_REQUEST: TransactionAnalyticsQueryInput = {
    queries: [
        {
            type: "DATE_RANGE",
            id: "total",
            includePrevious: true,
            groupBy: ["applicantSex"],
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "walk-in",
            filters: {
                type: "WALK_IN_REFERRAL",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "online",
            filters: {
                type: "ONLINE_REFERRAL",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "in-house",
            filters: {
                type: "IN_HOUSE_RECRUITMENT",
            },
            groupBy: ["applicantSex"],
            ...TODAY_PARAM,
            includePrevious: true,
        },
        {
            type: "DATE_RANGE",
            id: "work-immersion",
            filters: {
                demographics: "WORK_IMMERSION_INTERNSHIP",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "job-seeker",
            filters: {
                demographics: "FIRST_TIME_JOB_SEEKER",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "pwd",
            filters: {
                demographics: "PERSONS_WITH_DISABILITY",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "senior",
            filters: {
                demographics: "SENIOR_CITIZEN",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "young-worker",
            filters: {
                demographics: "YOUNG_WORKER",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "success",
            filters: {
                outcome: "SUCCESS",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "pending",
            filters: {
                outcome: "PENDING",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "mismatch",
            filters: {
                outcome: "MISMATCH",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "none",
            filters: {
                outcome: "NONE",
            },
            groupBy: ["applicantSex"],
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "BREAKDOWN",
            id: "weekly",
            breakdown: "DAILY",
            groupBy: "transactionType",
            ...WEEK_PARAM,
        },
        {
            type: "DATE_RANGE",
            groupBy: ["applicantSex"],
            id: "sex",
            ...WEEK_PARAM,
        },
    ],
} as const;

export const getQueryIds = (query: TransactionAnalyticsQueryInput, start?: number, end?: number) => {
    return query?.queries?.map((q) => q.id).slice(start, end);
};

export const buildLineWeekData = (rawData: BreakdownData) => {
    const rawDates = Object.keys(rawData.weekly); // ["2026-08-16", "2026-08-17", ...]

    const labels = rawDates.map((dateStr) => {
        const date = new Date(`${dateStr}T00:00:00`);

        // ["Sunday", "Monday", "Tuesday", "Wednesday"]
        return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    });

    const inHouseData = rawDates.map((date) => rawData.weekly[date].IN_HOUSE_RECRUITMENT);
    const onlineData = rawDates.map((date) => rawData.weekly[date].ONLINE_REFERRAL);
    const walkInData = rawDates.map((date) => rawData.weekly[date].WALK_IN_REFERRAL);

    return {
        labels: labels,
        datasets: [
            {
                label: "Walk-ins",
                data: walkInData,
                borderColor: ChartColorClasses["light-blue"],
                backgroundColor: ChartColorClasses["light-blue"],
                tension: 0.4,
                fill: {
                    target: "origin",
                    above: ChartColorClasses["light-blue-opaque"],
                },
            },
            {
                label: "Online Referral",
                data: onlineData,
                borderColor: ChartColorClasses["primary-blue"],
                backgroundColor: ChartColorClasses["primary-blue"],
                tension: 0.4,
                fill: {
                    target: "origin",
                    above: ChartColorClasses["primary-blue-opaque"],
                },
            },
            {
                label: "Inhouse Referral",
                data: inHouseData,
                borderColor: ChartColorClasses["red"],
                backgroundColor: ChartColorClasses["red"],
                tension: 0.4,
                fill: {
                    target: "origin",
                    above: ChartColorClasses["red-opaque"],
                },
            },
        ],
    };
};

export const buildSexChartWeekData = (rawData: BreakdownData) => {
    const femaleValue = rawData?.sex?.grouped?.FEMALE ?? 0;
    const maleValue = rawData?.sex?.grouped?.MALE ?? 0;

    return {
        labels: ["Female", "Male"],
        datasets: [
            {
                label: "# of Transactions",
                data: [femaleValue, maleValue],
                backgroundColor: [ChartColorClasses["pink-opaque"], ChartColorClasses["light-blue-opaque"]],
                borderColor: [ChartColorClasses["pink"], ChartColorClasses["light-blue"]],
            },
        ],
    };
};

// Testing for postman
console.log(JSON.stringify(DASHBOARD_OVERVIEW_REQUEST));

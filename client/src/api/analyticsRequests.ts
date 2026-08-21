import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

import type {
    TransactionAnalyticsFilterType,
    TransactionAnalyticsQueryInput,
} from "@qcpesopedro/shared/schema/transactions";
import { buildDayRangeParam, buildMonthRangeParam, buildWeekRangeParam, buildYearRangeParam } from "./actionService";
import type { MaterialIcon } from "../types/common";
import type { TransactionType } from "@qcpesopedro/shared/prisma/browser";

export interface DateRangeData {
    count?: number;
    grouped?: {
        MALE?: number;
        FEMALE?: number;
    };
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
export type BreakdownData = Record<string, number> | Record<string, Record<string, number>>;
export type AnalyticsData = Record<string, DateRangeData | BreakdownData>;
export type ReportTypes = "DAILY" | "WEEKLY" | "MONTHLY" | "SUMMARY";

// 8 AM to 5 PM
const TODAY_PARAM = buildDayRangeParam(new Date(), 8, 17);
const WEEK_PARAM = buildWeekRangeParam(new Date());
const MONTH_PARAM = buildMonthRangeParam(new Date());
const YEAR_PARAM = buildYearRangeParam(new Date());

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

export const RECENT_TRANSACTION_MAP: Record<TransactionType, string> = {
    WALK_IN_REFERRAL: CARD_MAP["walk-in"].title,
    ONLINE_REFERRAL: CARD_MAP.online.title,
    IN_HOUSE_RECRUITMENT: CARD_MAP["in-house"].title,
};

export const DASHBOARD_OVERVIEW_REQUEST: TransactionAnalyticsQueryInput = {
    queries: [
        {
            type: "DATE_RANGE",
            id: "total",
            includePrevious: true,
            groupBy: "applicantSex",
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "walk-in",
            filters: {
                type: "WALK_IN_REFERRAL",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "online",
            filters: {
                type: "ONLINE_REFERRAL",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "in-house",
            filters: {
                type: "IN_HOUSE_RECRUITMENT",
            },
            groupBy: "applicantSex",
            ...TODAY_PARAM,
            includePrevious: true,
        },
        {
            type: "DATE_RANGE",
            id: "work-immersion",
            filters: {
                demographics: "WORK_IMMERSION_INTERNSHIP",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "job-seeker",
            filters: {
                demographics: "FIRST_TIME_JOB_SEEKER",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "pwd",
            filters: {
                demographics: "PERSONS_WITH_DISABILITY",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "senior",
            filters: {
                demographics: "SENIOR_CITIZEN",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "young-worker",
            filters: {
                demographics: "YOUNG_WORKER",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "success",
            filters: {
                outcome: "SUCCESS",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "pending",
            filters: {
                outcome: "PENDING",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "mismatch",
            filters: {
                outcome: "MISMATCH",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "none",
            filters: {
                outcome: "NONE",
            },
            groupBy: "applicantSex",
            includePrevious: true,
            ...TODAY_PARAM,
        },
        {
            type: "BREAKDOWN",
            id: "weekly-breakdown",
            breakdown: "DAILY",
            groupBy: "transactionType",
            ...WEEK_PARAM,
        },
        {
            type: "DATE_RANGE",
            groupBy: "applicantSex",
            id: "sex",
            ...WEEK_PARAM,
        },
    ],
} as const;

export const DASHBOARD_DETAILS_REQUEST = (
    filters?: TransactionAnalyticsFilterType
): TransactionAnalyticsQueryInput => ({
    queries: [
        {
            type: "DATE_RANGE",
            id: "today",
            filters,
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "week",
            filters,
            ...WEEK_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "month",
            filters,
            ...MONTH_PARAM,
        },
        {
            type: "BREAKDOWN",
            id: "hourly",
            filters,
            breakdown: "HOURLY",
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "sex",
            filters,
            groupBy: "applicantSex",
            ...TODAY_PARAM,
        },
        {
            type: "DATE_RANGE",
            id: "staff",
            filters,
            groupBy: "userId",
            ...TODAY_PARAM,
        },
    ],
});

export const TRANSACTION_SUMMARY_REQUEST: TransactionAnalyticsQueryInput = {
    queries: [{ id: "summary", type: "BREAKDOWN", breakdown: "DAILY", ...WEEK_PARAM }],
};

export const TRANSACTION_REPORT_REQUEST = (type: ReportTypes): TransactionAnalyticsQueryInput => {
    let dateRange: { startDate: string; endDate: string } | undefined;
    switch (type) {
        case "DAILY":
            dateRange = TODAY_PARAM;
            break;
        case "WEEKLY":
            dateRange = WEEK_PARAM;
            break;
        case "MONTHLY":
            dateRange = MONTH_PARAM;
            break;
        default:
            dateRange = undefined;
    }

    return {
        queries: [
            {
                id: "total",
                type: "DATE_RANGE",
                ...dateRange,
            },
            {
                id: "success",
                type: "DATE_RANGE",
                ...dateRange,
            },
            {
                id: "walkin",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    type: "WALK_IN_REFERRAL",
                },
                ...dateRange,
            },
            {
                id: "online",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    type: "ONLINE_REFERRAL",
                },
                ...dateRange,
            },
            {
                id: "inhouse",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    type: "IN_HOUSE_RECRUITMENT",
                },
                ...dateRange,
            },
        ],
    };
};
export const getQueryIds = (query: TransactionAnalyticsQueryInput, start?: number, end?: number) => {
    return query?.queries?.map((q) => q.id).slice(start, end);
};

export const extractGroupedFromData = (data: AnalyticsData, sourceKey: string) => {
    const keyData = data?.[sourceKey] as DateRangeData | undefined;
    return Object.entries(keyData?.grouped ?? {});
};

// Testing for postman
console.log("====== OVERVIEW ========\n", JSON.stringify(DASHBOARD_OVERVIEW_REQUEST));
// console.log();
// console.log("====== DETAILS ========\n", JSON.stringify(DASHBOARD_DETAILS_REQUEST()));
// console.log("====== REPORT ========\n", JSON.stringify(TRANSACTION_REPORT_REQUEST("DAILY")));

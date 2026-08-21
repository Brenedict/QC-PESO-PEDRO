import type {
    TransactionAnalyticsFilterType,
    TransactionAnalyticsQueryInput,
} from "@qcpesopedro/shared/schema/transactions";
import { MONTH_PARAM, TODAY_PARAM, WEEK_PARAM } from "./dateService";

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
// console.log("====== OVERVIEW ========\n", JSON.stringify(DASHBOARD_OVERVIEW_REQUEST));
// console.log();
// console.log("====== DETAILS ========\n", JSON.stringify(DASHBOARD_DETAILS_REQUEST()));
// console.log("====== REPORT ========\n", JSON.stringify(TRANSACTION_REPORT_REQUEST("DAILY")));

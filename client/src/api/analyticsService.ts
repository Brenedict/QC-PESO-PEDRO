// General Imports
import type { LoaderFunctionArgs } from "react-router";
import type {
    TransactionAnalyticsFilterType,
    TransactionAnalyticsQueryInput,
} from "@qcpesopedro/shared/schema/transactions";
import { getDateParams } from "./dateService";

// API Services
import { getOverviewAnalytics, getRecentTransactions } from "../api/transactionService";
import { getShifts } from "./shiftService";

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

export const DASHBOARD_OVERVIEW_REQUEST = (): TransactionAnalyticsQueryInput => {
    const { todayParam, weekParam } = getDateParams();

    return {
        queries: [
            {
                type: "DATE_RANGE",
                id: "total",
                includePrevious: true,
                groupBy: "applicantSex",
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "walk-in",
                filters: {
                    type: "WALK_IN_REFERRAL",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "online",
                filters: {
                    type: "ONLINE_REFERRAL",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "in-house",
                filters: {
                    type: "IN_HOUSE_RECRUITMENT",
                },
                groupBy: "applicantSex",
                ...todayParam,
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
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "job-seeker",
                filters: {
                    demographics: "FIRST_TIME_JOB_SEEKER",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "pwd",
                filters: {
                    demographics: "PERSONS_WITH_DISABILITY",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "senior",
                filters: {
                    demographics: "SENIOR_CITIZEN",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "young-worker",
                filters: {
                    demographics: "YOUNG_WORKER",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "success",
                filters: {
                    outcome: "SUCCESS",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "pending",
                filters: {
                    outcome: "PENDING",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "mismatch",
                filters: {
                    outcome: "MISMATCH",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "none",
                filters: {
                    outcome: "NONE",
                },
                groupBy: "applicantSex",
                includePrevious: true,
                ...todayParam,
            },
            {
                type: "BREAKDOWN",
                id: "weekly-breakdown",
                breakdown: "DAILY",
                groupBy: "transactionType",
                ...weekParam,
            },
            {
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                id: "sex",
                ...weekParam,
            },
        ],
    };
};

export const DASHBOARD_DETAILS_REQUEST = (filters?: TransactionAnalyticsFilterType): TransactionAnalyticsQueryInput => {
    const { todayParam, monthParam, weekParam } = getDateParams();
    return {
        queries: [
            {
                type: "DATE_RANGE",
                id: "today",
                filters,
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "week",
                filters,
                ...weekParam,
            },
            {
                type: "DATE_RANGE",
                id: "month",
                filters,
                ...monthParam,
            },
            {
                type: "BREAKDOWN",
                id: "hourly",
                filters,
                breakdown: "HOURLY",
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "sex",
                filters,
                groupBy: "applicantSex",
                ...todayParam,
            },
            {
                type: "DATE_RANGE",
                id: "staff",
                filters,
                groupBy: "userId",
                ...todayParam,
            },
        ],
    };
};

export const TRANSACTION_SUMMARY_REQUEST = (): TransactionAnalyticsQueryInput => {
    const { weekParam } = getDateParams();

    return {
        queries: [{ id: "summary", type: "BREAKDOWN", breakdown: "DAILY", ...weekParam }],
    };
};

export const TRANSACTION_REPORT_REQUEST = (type: ReportTypes): TransactionAnalyticsQueryInput => {
    const { todayParam, monthParam, weekParam } = getDateParams();
    let dateRange: { startDate: string; endDate: string } | undefined;
    switch (type) {
        case "DAILY":
            dateRange = todayParam;
            break;
        case "WEEKLY":
            dateRange = weekParam;
            break;
        case "MONTHLY":
            dateRange = monthParam;
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
                filters: {
                    outcome: "SUCCESS",
                },
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
            {
                id: "job-seeker",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    demographics: "FIRST_TIME_JOB_SEEKER",
                },
                ...dateRange,
            },
            {
                id: "pwd",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    demographics: "PERSONS_WITH_DISABILITY",
                },
                ...dateRange,
            },
            {
                id: "senior",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    demographics: "SENIOR_CITIZEN",
                },
                ...dateRange,
            },
            {
                id: "young-worker",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    demographics: "YOUNG_WORKER",
                },
                ...dateRange,
            },
            {
                id: "work-immersion",
                type: "DATE_RANGE",
                groupBy: "applicantSex",
                filters: {
                    demographics: "WORK_IMMERSION_INTERNSHIP",
                },
                ...dateRange,
            },
        ],
    };
};

export const CONTEXT_ANALYTICS_REQUEST = (): TransactionAnalyticsQueryInput => {
    const { monthParam } = getDateParams();

    return {
        queries: [
            {
                type: "DATE_RANGE",
                id: "types",
                groupBy: "transactionType",
                includePrevious: true,
                ...monthParam,
            },
            {
                type: "DATE_RANGE",
                id: "outcomes",
                groupBy: "transactionOutcome",
                includePrevious: true,
                ...monthParam,
            },
            {
                type: "DATE_RANGE",
                id: "walkinoutcomes",
                groupBy: "transactionOutcome",
                includePrevious: true,
                filters: {
                    type: "WALK_IN_REFERRAL",
                },
                ...monthParam,
            },
            {
                type: "DATE_RANGE",
                id: "onlineoutcomes",
                groupBy: "transactionOutcome",
                includePrevious: true,
                filters: {
                    type: "ONLINE_REFERRAL",
                },
                ...monthParam,
            },
            {
                type: "DATE_RANGE",
                id: "inhouseoutcomes",
                groupBy: "transactionOutcome",
                includePrevious: true,
                filters: {
                    type: "IN_HOUSE_RECRUITMENT",
                },
                ...monthParam,
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

export const getAnalytics = async (args: LoaderFunctionArgs) => {
    const analytics = await getOverviewAnalytics(args);
    const recent = await getRecentTransactions(args);

    const overview = await getShifts(["pending", "approved", "revision"])(args);

    return { analytics, recent, overview };
};

// Testing for postman
// console.log("====== OVERVIEW ========\n", JSON.stringify(DASHBOARD_OVERVIEW_REQUEST));
// console.log();
// console.log("====== DETAILS ========\n", JSON.stringify(DASHBOARD_DETAILS_REQUEST()));
// console.log("====== REPORT ========\n", JSON.stringify(TRANSACTION_REPORT_REQUEST("DAILY")));
console.log("====== REPORT ========\n", JSON.stringify(CONTEXT_ANALYTICS_REQUEST()));

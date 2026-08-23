// General Imports
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

// PEDRO SHARED IMPORTS
import type { Outcome, TransactionType } from "@qcpesopedro/shared/prisma/client";
import type { TransactionScalarFieldEnum } from "@qcpesopedro/shared/zod/schemas";
import { groupByInterval, groupByIntervalWithColumn } from "@qcpesopedro/shared/prisma/sql";
import type { Transaction } from "@qcpesopedro/shared/prisma/client";
import type {
    QueryBreakdownType,
    QueryDateRangeType,
    TransactionAnalyticsQueryType,
    TransactionCreateType,
    TransactionQueryType,
} from "@qcpesopedro/shared/schema/transactions";
import type {
    DateTimeFilter,
    TransactionCountArgs,
    TransactionFindManyArgs,
    TransactionGroupByArgs,
    TransactionOrderByWithRelationInput,
    TransactionWhereInput,
} from "@qcpesopedro/shared/prisma/models";

// Models
import TransactionModel from "../models/transaction.model";
import UserModel from "../models/user.model";

// Utils
import DateUtil from "../utils/date.util";

// Prisma.config
import prisma from "../config/prisma.config";

// -----------------------------  TYPES & INTERFACES -----------------------------------------------

type ParsedAnalyticsQuery =
    | (Omit<QueryDateRangeType, "groupBy"> & {
          args: TransactionGroupByArgs | TransactionCountArgs;
      })
    | QueryBreakdownType;

interface ParsedAnalyticsRequest {
    queries: ParsedAnalyticsQuery[];
}

export interface TransactionFilters {
    transactionType?: TransactionType;
    transactionOutcome?: Outcome;
    createdAt?: string | Date | DateTimeFilter<"Transaction">;
    page?: number;
    limit?: number;
    search?: string;
}

const breakdownMap = {
    HOURLY: "hour",
    DAILY: "day",
    WEEKLY: "week",
    MONTHLY: "month",
    YEARLY: "year",
} as const;

// ----------------------------- PUBLIC FUNCTIONS --------------------------------------------------
export default {
    extractIndexFromCode(txCode: string) {
        const separatedCodes = txCode.split("-");
        return parseInt(separatedCodes.at(-1) as string) + 1;
    },

    // Append a `code` field to a transaction object
    async createTransactionCode(date: Date = new Date(), len: number = 1) {
        const formattedDate = DateUtil.getFormattedDate(date);

        // Number of transactions for that specific day
        const ordered = await this.getLatestTransactionPerMonth(date);
        const nextIndex = ordered?.[0] ? this.extractIndexFromCode(ordered[0].txCode) : 1;

        return [...Array(len)].map((_, i) => `TX-${formattedDate}-${String(nextIndex + i).padStart(4, "0")}`);
    },

    async createTransactionWithCode(transaction: TransactionCreateType, attempt = 0): Promise<Transaction | undefined> {
        const date = transaction.createdAt ?? new Date();
        const code = (await this.createTransactionCode(date))[0] as string;

        // Fallback (kapag di pa natatapos POST tapos nagrefresh nagsasaby sila ng GET)
        // nangyayari nagiging status 500 siya
        try {
            return await TransactionModel.createTransaction(transaction, code);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === "P2002" && attempt < 3) {
                return this.createTransactionWithCode(transaction, attempt + 1);
            }
            throw err;
        }
    },

    async createTransactionsWithCode(transactions: TransactionCreateType[]) {
        // Bucket by day so each unique date only queries the DB once
        const buckets = new Map<string, TransactionCreateType[]>();
        for (const transaction of transactions) {
            const date = transaction.createdAt ?? new Date();
            const key = DateUtil.getFormattedDate(date);
            buckets.set(key, [...(buckets.get(key) ?? []), transaction]); // Append yung previous na bucket
        }

        const codes: string[] = [];
        for (const bucket of buckets.values()) {
            if (!bucket[0]) continue;
            const date = bucket[0].createdAt ?? new Date();
            codes.push(...((await this.createTransactionCode(date, bucket.length)) as string[]));
        }

        return TransactionModel.createTransactions(transactions, codes);
    },

    async getTransactionsPerDay(date: Date, orderBy?: TransactionOrderByWithRelationInput) {
        const { startDate, endDate } = DateUtil.buildDayRange(date);

        return await TransactionModel.getTransactions({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy,
        });
    },

    async getLatestTransactionPerMonth(date: Date) {
        const { startDate, endDate } = DateUtil.buildMonthRange(date);

        return await TransactionModel.getTransactions({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { txCode: "desc" },
            take: 1,
        });
    },

    async countByDay(date: Date) {
        const { startDate, endDate } = DateUtil.buildDayRange(date);

        return TransactionModel.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
    },

    async transactionWithIdExists(id: number) {
        const transaction = await TransactionModel.getById(id);
        return !!transaction;
    },

    async transactionWithTxCodeExists(txCode: string) {
        const transaction = await TransactionModel.getByTxCode(txCode);
        return !!transaction;
    },

    async resolveTransactionId(id: string) {
        // Determine if the param represents a numeric ID
        const isNumeric = /^\d+$/.test(id);
        const numericId = isNumeric ? parseInt(id, 10) : NaN;

        const exists = isNumeric
            ? await this.transactionWithIdExists(numericId)
            : await this.transactionWithTxCodeExists(id);

        return { isNumeric, numericId, exists };
    },

    parseTransactionQuery(query: TransactionQueryType): TransactionFindManyArgs {
        const { startDate, endDate, type, outcome, page, limit, search, include } = query;

        return {
            where: {
                transactionType: type as TransactionType | undefined,
                transactionOutcome: outcome as Outcome | undefined,
                createdAt:
                    startDate || endDate
                        ? {
                              ...(startDate && { gte: startDate }),
                              ...(endDate && { lte: endDate }),
                          }
                        : undefined,

                ...(search && {
                    OR: [
                        { applicantFullName: { contains: search as string, mode: "insensitive" } },
                        { txCode: { contains: search as string, mode: "insensitive" } },
                    ],
                }),
            },
            orderBy: [{ createdAt: "desc" }, { id: "asc" }],
            include: include?.length ? Object.fromEntries(include.map((key) => [key, true])) : undefined,
            skip: page,
            take: limit,
        };
    },

    parseTransactionAnalyticsQuery(query?: TransactionAnalyticsQueryType): ParsedAnalyticsRequest | undefined {
        if (!query) return undefined;

        const { queries } = query;

        return {
            queries:
                queries?.map((query) => {
                    const startDate = query.startDate;
                    const endDate = query.endDate;

                    const where: TransactionWhereInput = {
                        transactionType: query.filters?.type,
                        transactionOutcome: query.filters?.outcome,
                        demographics: query.filters?.demographics ? { has: query.filters.demographics } : undefined,
                    };

                    if (query.type === "BREAKDOWN") {
                        return query;
                    }

                    return {
                        id: query.id,
                        type: query.type,
                        includePrevious: !!query.includePrevious,
                        startDate,
                        endDate,
                        args: {
                            by: query.groupBy ? [query.groupBy] : undefined,
                            _count: { _all: true },
                            where: {
                                ...where,
                                createdAt:
                                    startDate || endDate
                                        ? {
                                              ...(startDate && { gte: startDate }),
                                              ...(endDate && { lt: endDate }),
                                          }
                                        : undefined,
                            },
                        },
                    };
                }) ?? [],
        };
    },
    async resolveAnalyticsFilter(query?: ParsedAnalyticsRequest) {
        // No request or queries, dapat may overall
        if (!query || query.queries.length === 0) {
            const count = await TransactionModel.count();
            return { overall: { count } };
        }

        // If may queries, use their id
        const response: Record<string, unknown> = {};
        for (const analyticsQuery of query.queries) {
            let result;
            if (analyticsQuery.type === "DATE_RANGE") {
                result = await resolveTransactionQuery(
                    analyticsQuery.args,
                    analyticsQuery.startDate,
                    analyticsQuery.endDate,
                    analyticsQuery.includePrevious
                );
            } else if (analyticsQuery.type === "BREAKDOWN") {
                result = await resolveTransactionBreakdown(analyticsQuery);
            }
            response[analyticsQuery.id as string] = result;
        }

        return response;
    },
};

// ----------------------------- PRIVATE FUNCTIONS --------------------------------------------------
async function resolveTransactionQuery(
    args: TransactionGroupByArgs | TransactionCountArgs,
    startDate?: Date,
    endDate?: Date,
    includePrevious = false
) {
    const current = await resolveSingleTransactionQuery(args);

    if (!includePrevious || !startDate || !endDate) {
        return current;
    }

    const { startDate: previousStart, endDate: previousEnd } = DateUtil.getPreviousDateRange(startDate, endDate);

    const previous = await resolveSingleTransactionQuery({
        ...args,
        where: {
            ...args.where,
            createdAt: {
                gte: previousStart,
                lt: previousEnd,
            },
        },
    });

    return {
        current,
        previous,
    };
}

async function resolveSingleTransactionQuery(args: TransactionGroupByArgs | TransactionCountArgs) {
    const isGroupByArgs = args && "by" in args && args.by?.length > 0;

    // return only count when we dont have groupBy
    if (!isGroupByArgs) {
        const count = await TransactionModel.count(args);
        return { count };
    }

    const result = await TransactionModel.groupBy(args);
    const grouped = await formatTransactionQueryByResult(result, args.by[0] as TransactionScalarFieldEnum);
    const count = Object.values(grouped).reduce((total, value) => total + value, 0);

    return { count, grouped };
}

async function formatTransactionQueryByResult(
    result: Awaited<ReturnType<typeof TransactionModel.groupBy>>,
    groupBy: TransactionScalarFieldEnum
) {
    const response: Record<string, number> = {};

    result.forEach((data) => {
        // format the data into
        // {MALE: 21, FEMALE: 32 }
        const valueKey = String(data[groupBy]);
        const countObj = data._count as { _all?: number };
        response[valueKey] = countObj?._all ?? 0;
    });

    if (groupBy === "userId") {
        return remapUserIdsToNames(response);
    }

    return response;
}

async function remapUserIdsToNames(response: Record<string, number>) {
    const userIds = Object.keys(response)
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id));

    const users = await UserModel.getUsers({
        where: { id: { in: userIds } },
        select: { id: true, firstName: true, lastName: true },
    });

    if (!users) return response;

    const idToName = new Map(users.map((u) => [String(u.id), `${u.firstName} ${u.lastName}`]));

    const remapped: Record<string, number> = {};
    for (const [id, count] of Object.entries(response)) {
        const name = idToName.get(id) ?? `Unknown (${id})`;
        remapped[name] = (remapped[name] ?? 0) + count; // handles collisions if two ids somehow map to same name
    }
    return remapped;
}

async function resolveTransactionBreakdown(query: QueryBreakdownType) {
    const filtersToStringQuery = (filters?: QueryBreakdownType["filters"]): [string, string, string] => {
        return [String(filters?.type ?? ""), String(filters?.outcome ?? ""), String(filters?.demographics ?? "")];
    };
    const datePart = breakdownMap[query.breakdown];

    let result: groupByInterval.Result[] | groupByIntervalWithColumn.Result[];

    if (query.groupBy) {
        result = await prisma.$queryRawTyped(
            groupByIntervalWithColumn(
                datePart,
                query.groupBy,
                query.startDate,
                query.endDate,
                ...filtersToStringQuery(query.filters)
            )
        );
    } else {
        result = await prisma.$queryRawTyped(
            groupByInterval(datePart, query.startDate, query.endDate, ...filtersToStringQuery(query.filters))
        );
    }

    return formatTransactionBreakdownResult(result, query.breakdown);
}

function formatTransactionBreakdownResult(
    result: groupByInterval.Result[] | groupByIntervalWithColumn.Result[],
    breakdown: QueryBreakdownType["breakdown"]
) {
    // BREAKDOWN + groupBy
    if (result[0] && "groupValue" in result[0]) {
        const response: Record<string, Record<string, number>> = {};

        for (const row of result) {
            if (!row.bucket) continue;

            const bucket = DateUtil.formatDateBucket(row.bucket, breakdown);

            if (!bucket) continue;

            const groupValue = (row as groupByIntervalWithColumn.Result).groupValue ?? "UNKNOWN";
            const count = Number(row.count ?? 0);

            response[bucket] ??= {};
            response[bucket][groupValue] = (response[bucket][groupValue] ?? 0) + count;
        }

        return response;
    }

    // BREAKDOWN only
    const response: Record<string, number> = {};

    for (const row of result) {
        if (!row.bucket) continue;

        const bucket = DateUtil.formatDateBucket(row.bucket, breakdown);
        const count = Number(row.count ?? 0);

        response[bucket] = (response[bucket] ?? 0) + count;
    }

    return response;
}

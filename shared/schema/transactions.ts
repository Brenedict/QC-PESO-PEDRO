// General Imports
import { zfd } from "zod-form-data";
import "../zod/schemas/";
import {
    DemographicSchema,
    OutcomeSchema,
    TransactionScalarFieldEnumSchema,
    TransactionTypeSchema,
    TransactionUncheckedCreateInputObjectZodSchema,
    TransactionUncheckedUpdateInputObjectZodSchema,
    TransactionWhereUniqueInputObjectZodSchema,
} from "../zod/schemas/";
import z from "zod";
import { dateRangeFields, withDateRange } from "./date";

const FilterSchema = z
    .object({
        type: TransactionTypeSchema.optional(),
        outcome: OutcomeSchema.optional(),
        demographics: DemographicSchema.optional(),
    })
    .optional();

const QueryDateRangeSchema = withDateRange(
    z
        .object({
            type: z.literal("DATE_RANGE"),
            id: z.string(),
            groupBy: TransactionScalarFieldEnumSchema.optional(),
            includePrevious: z.boolean().optional(),
            filters: FilterSchema,
            ...dateRangeFields,
        })
        .strict()
);

const QueryBreakdownSchema = z
    .object({
        type: z.literal("BREAKDOWN"),
        id: z.string(),
        breakdown: z.enum(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
        groupBy: TransactionScalarFieldEnumSchema.optional(),
        startDate: z.coerce.date(),
        filters: FilterSchema,
        endDate: z.coerce.date(),
    })
    .refine(({ startDate, endDate }) => startDate <= endDate, {
        message: "Start date cannot be after end date",
        path: ["endDate"],
    })
    .strict();

export const TransactionFormCreateSchema = zfd.formData(
    TransactionUncheckedCreateInputObjectZodSchema.omit({
        id: true,
        txCode: true,
        shiftLogId: true,
        userId: true,
    }).extend({
        shiftLogId: zfd.numeric(TransactionUncheckedCreateInputObjectZodSchema.shape.shiftLogId),
        userId: zfd.numeric(TransactionUncheckedCreateInputObjectZodSchema.shape.userId),
    })
);

export const TransactionFormUpdateSchema = zfd.formData(
    TransactionUncheckedUpdateInputObjectZodSchema.omit({
        txCode: true,
        id: true,
        createdAt: true,
        shiftLogId: true,
        userId: true,
    }).extend({
        shiftLogId: zfd.numeric(TransactionUncheckedUpdateInputObjectZodSchema.shape.shiftLogId),
        userId: zfd.numeric(TransactionUncheckedUpdateInputObjectZodSchema.shape.userId),
        demographics: z.preprocess(
            (val) => (val == null ? [] : Array.isArray(val) ? val : [val]),
            z.array(DemographicSchema).optional()
        ),
    })
);

export const TransactionFormDeleteSchema = zfd.formData(TransactionWhereUniqueInputObjectZodSchema);

export const TransactionQuerySchema = withDateRange(
    z.object({
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().optional(),
        type: TransactionTypeSchema.optional(),
        outcome: OutcomeSchema.optional(),
        search: z.string().optional(),
        include: z
            .union([z.enum(["user", "shiftLog"]), z.array(z.enum(["user", "shiftLog"]))])
            .transform((val) => (Array.isArray(val) ? val : [val]))
            .optional(),
        ...dateRangeFields,
    })
)
    .refine(({ page, limit }) => page === undefined || limit !== undefined, {
        message: "Page query provided without limit",
        path: ["limit"],
    })
    .transform(({ page, limit, ...rest }) => ({
        ...rest,
        page: page !== undefined && limit !== undefined ? (page - 1) * limit : undefined,
        limit,
    }));

export const TransactionAnalyticsQuerySchema = z
    .object({
        queries: z.array(z.union([QueryDateRangeSchema, QueryBreakdownSchema])).optional(),
    })
    .optional();

// ------------------------------- TYPES -------------------------------------
export type TransactionCreateType = z.infer<typeof TransactionFormCreateSchema>;
export type TransactionUpdateType = z.infer<typeof TransactionFormUpdateSchema>;
export type TransactionDeleteType = z.infer<typeof TransactionFormDeleteSchema>;
export type TransactionQueryType = z.infer<typeof TransactionQuerySchema>;
export type TransactionQueryInput = z.input<typeof TransactionQuerySchema>;
export type TransactionAnalyticsQueryType = z.infer<typeof TransactionAnalyticsQuerySchema>;
export type TransactionAnalyticsQueryInput = z.input<typeof TransactionAnalyticsQuerySchema>;
export type QueryDateRangeType = z.infer<typeof QueryDateRangeSchema>;
export type QueryBreakdownType = z.infer<typeof QueryBreakdownSchema>;
export type TransactionAnalyticsFilterType = z.infer<typeof FilterSchema>;

import { z } from "zod";
import { zfd } from "zod-form-data";
import { dateRangeFields, withDateRange } from "./date";
import { EnvironmentTagSchema, ESSStatusSchema } from "../zod/schemas";

export const ShiftQuerySchema = withDateRange(
    z.object({
        ...dateRangeFields,
        status: ESSStatusSchema.optional(),
        search: z.string().optional(),
    })
);

export const ShiftFormCreateSchema = zfd.formData(
    z.object({
        userId: zfd.numeric(z.number().int().positive()),

        timeIn: zfd.text(
            z
                .string()
                .transform((value) => new Date(value))
                .refine((date) => !Number.isNaN(date.getTime()), {
                    message: "Invalid date",
                })
        ),
    })
);

export const ShiftFormEndSchema = zfd.formData(
    z.object({
        generalRemarks: z.string().optional(),
        environmentTags: z.preprocess(
            (val) => (val == null ? [] : Array.isArray(val) ? val : [val]),
            z.array(EnvironmentTagSchema).optional()
        ),
    })
);

export const ShiftFormVerifySchema = zfd.formData(
    z.object({
        status: ESSStatusSchema,
        adminRemarks: z.string().optional(),
    })
);

export const ShiftDetailsQuerySchema = z.object({
    overview: z.preprocess(
        (val) => (Array.isArray(val) ? val : [val]),
        z.array(z.enum(["total", "none", "pending", "mismatch", "success"])).optional()
    ),
    analytics: z.preprocess((val) => Boolean(val), z.boolean().optional()),
    include: z.preprocess(
        (val) => (Array.isArray(val) ? val : [val]),
        z.array(z.enum(["shift", "user", "transactions"])).optional()
    ),
});

export type ShiftQueryType = z.infer<typeof ShiftQuerySchema>;
export type ShiftDetailsQueryType = z.infer<typeof ShiftDetailsQuerySchema>;
export type ShiftFormCreateType = z.infer<typeof ShiftFormCreateSchema>;
export type ShiftFormEndType = z.infer<typeof ShiftFormEndSchema>;
export type ShiftFormEndInput = z.input<typeof ShiftFormEndSchema>;
export type ShiftFormVerifyType = z.infer<typeof ShiftFormVerifySchema>;
export type ShiftFormVerifyInput = z.input<typeof ShiftFormVerifySchema>;

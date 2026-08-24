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
    overview: z.preprocess((val) => Boolean(val), z.boolean()),
    transactions: z.preprocess((val) => Boolean(val), z.boolean()),
});

export type ShiftQueryType = z.infer<typeof ShiftQuerySchema>;
export type ShiftDetailsQueryType = z.infer<typeof ShiftDetailsQuerySchema>;
export type ShiftFormEndType = z.infer<typeof ShiftFormEndSchema>;
export type ShiftFormEndInput = z.input<typeof ShiftFormEndSchema>;
export type ShiftFormVerifyType = z.infer<typeof ShiftFormVerifySchema>;
export type ShiftFormVerifyInput = z.input<typeof ShiftFormVerifySchema>;

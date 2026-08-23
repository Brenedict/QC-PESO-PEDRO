import { z } from "zod";
import { zfd } from "zod-form-data";
import { dateRangeFields, withDateRange } from "./date";
import { EnvironmentTagSchema, ESSStatusSchema } from "../zod/schemas";

export const ShiftQuerySchema = withDateRange(
    z.object({
        ...dateRangeFields,
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
        status: ESSStatusSchema.optional(),
        adminRemarks: z.string().optional(),
    })
);

export type ShiftQueryType = z.infer<typeof ShiftQuerySchema>;
export type ShiftFormEndType = z.infer<typeof ShiftFormEndSchema>;
export type ShiftFormEndInput = z.input<typeof ShiftFormEndSchema>;
export type ShiftFormVerifyType = z.infer<typeof ShiftFormVerifySchema>;
export type ShiftFormVerifyInput = z.input<typeof ShiftFormVerifySchema>;

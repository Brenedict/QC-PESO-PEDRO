import { zfd } from "zod-form-data";
import "../zod/schemas/";
import {
    TransactionUncheckedCreateInputObjectZodSchema,
    TransactionUncheckedUpdateInputObjectZodSchema,
    TransactionWhereUniqueInputObjectZodSchema,
} from "../zod/schemas/";
import z from "zod";

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
    })
);

export const TransactionQuerySchema = z
    .object({
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().optional(),
        type: TransactionUncheckedCreateInputObjectZodSchema.shape.transactionType,
        outcome: TransactionUncheckedCreateInputObjectZodSchema.shape.transactionOutcome,
        search: z.string().optional(),
    })
    .refine(({ startDate, endDate }) => !startDate || !endDate || startDate <= endDate, {
        message: "Start date cannot be after end date",
        path: ["endDate"],
    })
    .refine(({ page, limit }) => page === undefined || limit !== undefined, {
        message: "Page query provided without limit",
        path: ["limit"],
    })
    .transform(({ page, limit, ...rest }) => ({
        ...rest,
        page: page !== undefined && limit !== undefined ? (page - 1) * limit : undefined,
        limit,
    }));

export type TransactionCreateType = z.infer<typeof TransactionFormCreateSchema>;
export type TransactionUpdateType = z.infer<typeof TransactionFormUpdateSchema>;
export const TransactionFormDeleteSchema = zfd.formData(TransactionWhereUniqueInputObjectZodSchema);
export type TransactionDeleteType = z.infer<typeof TransactionFormDeleteSchema>;
export type TransactionQueryType = z.infer<typeof TransactionQuerySchema>;

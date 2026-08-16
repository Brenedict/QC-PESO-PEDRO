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
export type TransactionCreateType = z.infer<typeof TransactionFormCreateSchema>;

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
export type TransactionUpdateType = z.infer<typeof TransactionFormUpdateSchema>;

export const TransactionFormDeleteSchema = zfd.formData(TransactionWhereUniqueInputObjectZodSchema);
export type TransactionDeleteType = z.infer<typeof TransactionFormDeleteSchema>;

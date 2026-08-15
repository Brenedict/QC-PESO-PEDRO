import { zfd } from "zod-form-data";
import "../zod/schemas/";
import {
    TransactionUncheckedCreateInputObjectZodSchema,
    TransactionUncheckedUpdateInputObjectZodSchema,
} from "../zod/schemas/";
import z from "zod";

export const TransactionFormCreateSchema = zfd.formData(
    TransactionUncheckedCreateInputObjectZodSchema.omit({
        txCode: true,
    })
);
export type TransactionCreateType = z.infer<typeof TransactionFormCreateSchema>;

export const TransactionFormUpdateSchema = zfd.formData(
    TransactionUncheckedUpdateInputObjectZodSchema.omit({
        id: true,
        createdAt: true,
        txCode: true,
    })
);
export type TransactionUpdateType = z.infer<typeof TransactionFormUpdateSchema>;

// General Imports
import { zfd } from "zod-form-data";
import z from "zod";
import "../zod/schemas";
import { UserUncheckedCreateInputObjectZodSchema, UserUncheckedUpdateInputObjectZodSchema } from "../zod/schemas";

export const UserFormCreateSchema = zfd.formData(
    UserUncheckedCreateInputObjectZodSchema.omit({
        password: true,
        createdAt: true,
        auditLogs: true,
        shiftLogs: true,
        accountLogs: true,
        transactions: true,
    })
);

export type UserFormCreateType = z.infer<typeof UserFormCreateSchema>;

export const UserFormUpdateSchema = zfd.formData(
    UserUncheckedUpdateInputObjectZodSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        auditLogs: true,
        shiftLogs: true,
        accountLogs: true,
        transactions: true,
    })
);

export type UserFormUpdateType = z.infer<typeof UserFormUpdateSchema>;

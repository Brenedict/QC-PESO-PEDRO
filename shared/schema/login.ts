// General Imports
import { zfd } from "zod-form-data";
import z from "zod";
import { RoleSchema, UserUncheckedCreateInputObjectZodSchema } from "../zod/schemas";

export const LoginSchema = zfd.formData({
    email: z.email().trim().min(1, "Email cannot be empty"),
    password: z.string().trim().min(1, "Password cannot be empty"),
});

export const UserContextSchema = zfd.formData(
    UserUncheckedCreateInputObjectZodSchema.omit({
        id: true,
        role: true,
        password: true,
        createdAt: true,
        auditLogs: true,
        shiftLogs: true,
        accountLogs: true,
        transactions: true,
        shift: true,
    }).extend({
        id: z.number(),
        shiftLogId: z.number().optional(),
        role: RoleSchema,
    })
);

export type UserContextType = z.infer<typeof UserContextSchema>;

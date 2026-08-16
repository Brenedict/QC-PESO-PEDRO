import { zfd } from "zod-form-data";
import z from "zod";
import { UserUncheckedCreateInputObjectZodSchema } from "../zod/schemas";

export const LoginSchema = zfd.formData({
    email: z.email().trim().min(1, "Email cannot be empty"),
    password: z.string().trim().min(1, "Password cannot be empty"),
});

export const UserContextSchema = zfd.formData(
    UserUncheckedCreateInputObjectZodSchema.omit({
        password: true,
        createdAt: true,
        auditLogs: true,
        shiftLogs: true,
        accountLogs: true,
        transactions: true,
        shift: true,
    }).extend({
        shiftLogId: z.number(),
    })
);

export type UserContextType = z.infer<typeof UserContextSchema>;

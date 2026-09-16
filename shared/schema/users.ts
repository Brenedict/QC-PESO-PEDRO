// General Imports
import { zfd } from "zod-form-data";
import z from "zod";
import "../zod/schemas";
import {
    RoleSchema,
    UserUncheckedCreateInputObjectZodSchema,
    UserUncheckedUpdateInputObjectZodSchema,
} from "../zod/schemas";

export const UserFormCreateSchema = zfd.formData(
    UserUncheckedCreateInputObjectZodSchema.omit({
        password: true,
        createdAt: true,
        auditLogs: true,
        notifications: true,
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
        notifications: true,
        shiftLogs: true,
        accountLogs: true,
        transactions: true,
    })
);

export const UserQuerySchema = z.object({
    search: z.string().optional(),
    role: RoleSchema.optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const UserFormChangePasswordSchema = zfd
    .formData({
        currentPassword: z.string().min(8).optional(),
        newPassword: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const UserPreferencesSchema = zfd.formData(
    z.object({
        notifSoundEnabled: zfd.checkbox(),
    })
);

export type UserPreferencesType = z.infer<typeof UserPreferencesSchema>;
export type UserFormUpdateType = z.infer<typeof UserFormUpdateSchema>;
export type UserQueryType = z.infer<typeof UserQuerySchema>;
export type UserQueryInput = z.input<typeof UserQuerySchema>;

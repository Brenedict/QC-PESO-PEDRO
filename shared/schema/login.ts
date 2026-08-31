// General Imports
import { zfd } from "zod-form-data";
import z from "zod";
import {
    RoleSchema,
    ShiftLogInputSchema,
    ShiftLogModelSchema,
    ShiftLogUncheckedCreateInputObjectSchema,
    StatusSchema,
    UserUncheckedCreateInputObjectZodSchema,
} from "../zod/schemas";
import { dateRangeFields } from "./date";
import { withDateRange } from "./date";

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
    }).extend({
        id: z.number(),
        shiftLog: ShiftLogUncheckedCreateInputObjectSchema.optional(),
        role: RoleSchema,
        hasEndedShift: z.boolean(),
    })
);

export const AccountLogQueryOverviewSchema = withDateRange(
    z.object({
        ...dateRangeFields,
        search: z.string().optional(),
        role: RoleSchema.optional(),
        status: StatusSchema.optional(),
    })
);

export const AccountLogFormUpdateSchema = zfd.formData(
    z.object({
        remarks: z.string().optional(),
        reason: z.string().optional(),
    })
);

export type UserContextType = z.infer<typeof UserContextSchema>;
export type AccountLogQueryOverviewType = z.infer<typeof AccountLogQueryOverviewSchema>;
export type AccountLogFormUpdateType = z.infer<typeof AccountLogFormUpdateSchema>;

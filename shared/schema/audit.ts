// General Imports
import { zfd } from "zod-form-data";
import z from "zod";
import "../zod/schemas";
import { AuditLogUncheckedCreateInputObjectZodSchema } from "../zod/schemas";
import { LogAction } from "@qcpesopedro/shared/prisma/browser";

export const AuditLogFormCreateSchema = zfd.formData(
    AuditLogUncheckedCreateInputObjectZodSchema.omit({
        id: true,
    })
);

export type AuditLogFormCreateType = z.infer<typeof AuditLogFormCreateSchema>;

export const AuditLogUserSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
});

export const AuditLogResponseSchema = z.object({
    id: z.number(),
    userId: z.number().nullable(),
    createdAt: z.coerce.date(),
    actionPerformed: LogAction,
    affectedRecordId: z.string(),
    changesDetails: z.string(),
    remarks: z.string(),
    user: AuditLogUserSchema.nullable(),
});

export const AuditLogsResponseSchema = z.array(AuditLogResponseSchema);

export type AuditLogUserType = z.infer<typeof AuditLogUserSchema>;
export type AuditLogResponseType = z.infer<typeof AuditLogResponseSchema>;
export type AuditLogsResponseType = z.infer<typeof AuditLogsResponseSchema>;

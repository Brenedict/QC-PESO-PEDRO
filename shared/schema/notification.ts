// General Imports
import { z } from "zod";

// PEDRO SHARED IMPORTS
import { AuditLogResponseSchema } from "./audit";

export const NotificationResponseSchema = z.object({
    id: z.number(),
    recipientId: z.number(),
    auditLogId: z.number().nullable(),
    readAt: z.coerce.date().nullable(),
    createdAt: z.coerce.date(),
    auditLog: AuditLogResponseSchema.nullable(),
});

export const NotificationFeedResponseSchema = z.object({
    unreadCount: z.number(),
    notifications: z.array(NotificationResponseSchema),
});

export type NotificationResponseType = z.infer<typeof NotificationResponseSchema>;
export type NotificationFeedResponseType = z.infer<typeof NotificationFeedResponseSchema>;
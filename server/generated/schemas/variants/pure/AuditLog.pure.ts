import * as z from 'zod';
import { LogActionSchema } from '../../enums/LogAction.schema';
// prettier-ignore
export const AuditLogModelSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    createdAt: z.date(),
    actionPerformed: LogActionSchema,
    affectedRecordId: z.number().int(),
    changesDetails: z.string()
}).strict();

export type AuditLogPureType = z.infer<typeof AuditLogModelSchema>;

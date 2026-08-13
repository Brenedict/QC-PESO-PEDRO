import * as z from 'zod';
import { LogActionSchema } from '../../enums/LogAction.schema';
// prettier-ignore
export const AuditLogInputSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    createdAt: z.coerce.date(),
    actionPerformed: LogActionSchema,
    affectedRecordId: z.number().int(),
    changesDetails: z.string()
}).strict();

export type AuditLogInputType = z.infer<typeof AuditLogInputSchema>;

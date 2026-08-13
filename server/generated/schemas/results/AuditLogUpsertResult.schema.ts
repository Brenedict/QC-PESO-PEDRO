import * as z from 'zod';
export const AuditLogUpsertResultSchema = z.object({
  id: z.number().int(),
  user: z.unknown().optional(),
  userId: z.number().int(),
  createdAt: z.date(),
  actionPerformed: z.unknown(),
  affectedRecordId: z.number().int(),
  changesDetails: z.string()
});
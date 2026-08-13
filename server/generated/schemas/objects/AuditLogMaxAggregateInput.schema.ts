import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  actionPerformed: z.literal(true).optional(),
  affectedRecordId: z.literal(true).optional(),
  changesDetails: z.literal(true).optional()
}).strict();
export const AuditLogMaxAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogMaxAggregateInputType>;
export const AuditLogMaxAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  actionPerformed: z.literal(true).optional(),
  affectedRecordId: z.literal(true).optional(),
  changesDetails: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AuditLogCountAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCountAggregateInputType>;
export const AuditLogCountAggregateInputObjectZodSchema = makeSchema();

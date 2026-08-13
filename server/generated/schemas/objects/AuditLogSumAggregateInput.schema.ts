import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  affectedRecordId: z.literal(true).optional()
}).strict();
export const AuditLogSumAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogSumAggregateInputType>;
export const AuditLogSumAggregateInputObjectZodSchema = makeSchema();

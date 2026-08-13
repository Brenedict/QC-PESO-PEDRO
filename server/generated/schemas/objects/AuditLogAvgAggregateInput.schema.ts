import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  affectedRecordId: z.literal(true).optional()
}).strict();
export const AuditLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogAvgAggregateInputType>;
export const AuditLogAvgAggregateInputObjectZodSchema = makeSchema();

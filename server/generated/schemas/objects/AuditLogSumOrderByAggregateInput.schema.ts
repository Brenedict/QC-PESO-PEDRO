import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  affectedRecordId: SortOrderSchema.optional()
}).strict();
export const AuditLogSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogSumOrderByAggregateInput>;
export const AuditLogSumOrderByAggregateInputObjectZodSchema = makeSchema();

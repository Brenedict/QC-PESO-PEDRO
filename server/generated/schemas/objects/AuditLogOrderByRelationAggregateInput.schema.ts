import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AuditLogOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AuditLogOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogOrderByRelationAggregateInput>;
export const AuditLogOrderByRelationAggregateInputObjectZodSchema = makeSchema();

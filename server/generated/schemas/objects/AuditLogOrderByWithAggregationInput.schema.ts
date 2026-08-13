import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AuditLogCountOrderByAggregateInputObjectSchema as AuditLogCountOrderByAggregateInputObjectSchema } from './AuditLogCountOrderByAggregateInput.schema';
import { AuditLogAvgOrderByAggregateInputObjectSchema as AuditLogAvgOrderByAggregateInputObjectSchema } from './AuditLogAvgOrderByAggregateInput.schema';
import { AuditLogMaxOrderByAggregateInputObjectSchema as AuditLogMaxOrderByAggregateInputObjectSchema } from './AuditLogMaxOrderByAggregateInput.schema';
import { AuditLogMinOrderByAggregateInputObjectSchema as AuditLogMinOrderByAggregateInputObjectSchema } from './AuditLogMinOrderByAggregateInput.schema';
import { AuditLogSumOrderByAggregateInputObjectSchema as AuditLogSumOrderByAggregateInputObjectSchema } from './AuditLogSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  actionPerformed: SortOrderSchema.optional(),
  affectedRecordId: SortOrderSchema.optional(),
  changesDetails: SortOrderSchema.optional(),
  _count: z.lazy(() => AuditLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AuditLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AuditLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AuditLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AuditLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AuditLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AuditLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogOrderByWithAggregationInput>;
export const AuditLogOrderByWithAggregationInputObjectZodSchema = makeSchema();

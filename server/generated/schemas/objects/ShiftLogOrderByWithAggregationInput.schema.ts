import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ShiftLogCountOrderByAggregateInputObjectSchema as ShiftLogCountOrderByAggregateInputObjectSchema } from './ShiftLogCountOrderByAggregateInput.schema';
import { ShiftLogAvgOrderByAggregateInputObjectSchema as ShiftLogAvgOrderByAggregateInputObjectSchema } from './ShiftLogAvgOrderByAggregateInput.schema';
import { ShiftLogMaxOrderByAggregateInputObjectSchema as ShiftLogMaxOrderByAggregateInputObjectSchema } from './ShiftLogMaxOrderByAggregateInput.schema';
import { ShiftLogMinOrderByAggregateInputObjectSchema as ShiftLogMinOrderByAggregateInputObjectSchema } from './ShiftLogMinOrderByAggregateInput.schema';
import { ShiftLogSumOrderByAggregateInputObjectSchema as ShiftLogSumOrderByAggregateInputObjectSchema } from './ShiftLogSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  timeIn: SortOrderSchema.optional(),
  timeOut: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  generalRemarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  adminRemarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastVerifiedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastVerifiedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  environmentTags: SortOrderSchema.optional(),
  _count: z.lazy(() => ShiftLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ShiftLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ShiftLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ShiftLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ShiftLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ShiftLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ShiftLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogOrderByWithAggregationInput>;
export const ShiftLogOrderByWithAggregationInputObjectZodSchema = makeSchema();

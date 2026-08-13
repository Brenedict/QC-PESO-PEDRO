import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AccountLogCountOrderByAggregateInputObjectSchema as AccountLogCountOrderByAggregateInputObjectSchema } from './AccountLogCountOrderByAggregateInput.schema';
import { AccountLogAvgOrderByAggregateInputObjectSchema as AccountLogAvgOrderByAggregateInputObjectSchema } from './AccountLogAvgOrderByAggregateInput.schema';
import { AccountLogMaxOrderByAggregateInputObjectSchema as AccountLogMaxOrderByAggregateInputObjectSchema } from './AccountLogMaxOrderByAggregateInput.schema';
import { AccountLogMinOrderByAggregateInputObjectSchema as AccountLogMinOrderByAggregateInputObjectSchema } from './AccountLogMinOrderByAggregateInput.schema';
import { AccountLogSumOrderByAggregateInputObjectSchema as AccountLogSumOrderByAggregateInputObjectSchema } from './AccountLogSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  logIn: SortOrderSchema.optional(),
  logOut: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  remarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => AccountLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AccountLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AccountLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AccountLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AccountLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AccountLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AccountLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogOrderByWithAggregationInput>;
export const AccountLogOrderByWithAggregationInputObjectZodSchema = makeSchema();

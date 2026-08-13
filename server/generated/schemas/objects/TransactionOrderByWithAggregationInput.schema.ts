import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TransactionCountOrderByAggregateInputObjectSchema as TransactionCountOrderByAggregateInputObjectSchema } from './TransactionCountOrderByAggregateInput.schema';
import { TransactionAvgOrderByAggregateInputObjectSchema as TransactionAvgOrderByAggregateInputObjectSchema } from './TransactionAvgOrderByAggregateInput.schema';
import { TransactionMaxOrderByAggregateInputObjectSchema as TransactionMaxOrderByAggregateInputObjectSchema } from './TransactionMaxOrderByAggregateInput.schema';
import { TransactionMinOrderByAggregateInputObjectSchema as TransactionMinOrderByAggregateInputObjectSchema } from './TransactionMinOrderByAggregateInput.schema';
import { TransactionSumOrderByAggregateInputObjectSchema as TransactionSumOrderByAggregateInputObjectSchema } from './TransactionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  shiftLogId: SortOrderSchema.optional(),
  applicantFirstName: SortOrderSchema.optional(),
  applicantLastName: SortOrderSchema.optional(),
  applicantSex: SortOrderSchema.optional(),
  transactionOutcome: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  transactionType: SortOrderSchema.optional(),
  remarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  demographics: SortOrderSchema.optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => TransactionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => TransactionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const TransactionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionOrderByWithAggregationInput>;
export const TransactionOrderByWithAggregationInputObjectZodSchema = makeSchema();

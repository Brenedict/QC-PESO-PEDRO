import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  shiftLogId: SortOrderSchema.optional()
}).strict();
export const TransactionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TransactionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionAvgOrderByAggregateInput>;
export const TransactionAvgOrderByAggregateInputObjectZodSchema = makeSchema();

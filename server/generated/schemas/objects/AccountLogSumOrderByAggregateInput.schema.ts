import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const AccountLogSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogSumOrderByAggregateInput>;
export const AccountLogSumOrderByAggregateInputObjectZodSchema = makeSchema();

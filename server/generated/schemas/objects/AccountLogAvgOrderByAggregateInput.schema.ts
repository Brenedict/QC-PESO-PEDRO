import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const AccountLogAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogAvgOrderByAggregateInput>;
export const AccountLogAvgOrderByAggregateInputObjectZodSchema = makeSchema();

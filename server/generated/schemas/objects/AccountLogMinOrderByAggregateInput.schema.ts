import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  logIn: SortOrderSchema.optional(),
  logOut: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  remarks: SortOrderSchema.optional()
}).strict();
export const AccountLogMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogMinOrderByAggregateInput>;
export const AccountLogMinOrderByAggregateInputObjectZodSchema = makeSchema();

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
export const AccountLogCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogCountOrderByAggregateInput>;
export const AccountLogCountOrderByAggregateInputObjectZodSchema = makeSchema();

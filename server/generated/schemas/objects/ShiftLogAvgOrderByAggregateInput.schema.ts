import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const ShiftLogAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShiftLogAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogAvgOrderByAggregateInput>;
export const ShiftLogAvgOrderByAggregateInputObjectZodSchema = makeSchema();

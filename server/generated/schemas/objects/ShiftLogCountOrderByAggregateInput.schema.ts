import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  timeIn: SortOrderSchema.optional(),
  timeOut: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  generalRemarks: SortOrderSchema.optional(),
  adminRemarks: SortOrderSchema.optional(),
  lastVerifiedBy: SortOrderSchema.optional(),
  lastVerifiedAt: SortOrderSchema.optional(),
  environmentTags: SortOrderSchema.optional()
}).strict();
export const ShiftLogCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShiftLogCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCountOrderByAggregateInput>;
export const ShiftLogCountOrderByAggregateInputObjectZodSchema = makeSchema();

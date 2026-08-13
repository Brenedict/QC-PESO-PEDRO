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
  lastVerifiedAt: SortOrderSchema.optional()
}).strict();
export const ShiftLogMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShiftLogMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogMaxOrderByAggregateInput>;
export const ShiftLogMaxOrderByAggregateInputObjectZodSchema = makeSchema();

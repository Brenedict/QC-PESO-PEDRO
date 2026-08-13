import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ShiftLogOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ShiftLogOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogOrderByRelationAggregateInput>;
export const ShiftLogOrderByRelationAggregateInputObjectZodSchema = makeSchema();

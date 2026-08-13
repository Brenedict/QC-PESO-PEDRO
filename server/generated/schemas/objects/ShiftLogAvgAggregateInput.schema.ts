import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const ShiftLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.ShiftLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogAvgAggregateInputType>;
export const ShiftLogAvgAggregateInputObjectZodSchema = makeSchema();

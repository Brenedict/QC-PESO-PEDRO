import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  shiftLogId: z.literal(true).optional()
}).strict();
export const TransactionAvgAggregateInputObjectSchema: z.ZodType<Prisma.TransactionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TransactionAvgAggregateInputType>;
export const TransactionAvgAggregateInputObjectZodSchema = makeSchema();

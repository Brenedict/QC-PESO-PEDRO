import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  shiftLogId: z.literal(true).optional()
}).strict();
export const TransactionSumAggregateInputObjectSchema: z.ZodType<Prisma.TransactionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TransactionSumAggregateInputType>;
export const TransactionSumAggregateInputObjectZodSchema = makeSchema();

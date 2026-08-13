import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const AccountLogSumAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogSumAggregateInputType>;
export const AccountLogSumAggregateInputObjectZodSchema = makeSchema();

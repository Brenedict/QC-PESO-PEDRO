import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const AccountLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogAvgAggregateInputType>;
export const AccountLogAvgAggregateInputObjectZodSchema = makeSchema();

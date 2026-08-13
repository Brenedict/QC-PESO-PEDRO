import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  logIn: z.literal(true).optional(),
  logOut: z.literal(true).optional(),
  reason: z.literal(true).optional(),
  remarks: z.literal(true).optional()
}).strict();
export const AccountLogMaxAggregateInputObjectSchema: z.ZodType<Prisma.AccountLogMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogMaxAggregateInputType>;
export const AccountLogMaxAggregateInputObjectZodSchema = makeSchema();

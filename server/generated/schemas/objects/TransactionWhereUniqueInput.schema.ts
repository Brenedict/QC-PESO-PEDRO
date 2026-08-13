import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const TransactionWhereUniqueInputObjectSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionWhereUniqueInput>;
export const TransactionWhereUniqueInputObjectZodSchema = makeSchema();

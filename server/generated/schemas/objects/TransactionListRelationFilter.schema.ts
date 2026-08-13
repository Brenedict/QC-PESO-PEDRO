import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './TransactionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => TransactionWhereInputObjectSchema).optional(),
  some: z.lazy(() => TransactionWhereInputObjectSchema).optional(),
  none: z.lazy(() => TransactionWhereInputObjectSchema).optional()
}).strict();
export const TransactionListRelationFilterObjectSchema: z.ZodType<Prisma.TransactionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TransactionListRelationFilter>;
export const TransactionListRelationFilterObjectZodSchema = makeSchema();

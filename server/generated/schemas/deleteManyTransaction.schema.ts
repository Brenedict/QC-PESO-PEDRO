import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './objects/TransactionWhereInput.schema';

export const TransactionDeleteManySchema: z.ZodType<Prisma.TransactionDeleteManyArgs> = z.object({ where: TransactionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TransactionDeleteManyArgs>;

export const TransactionDeleteManyZodSchema = z.object({ where: TransactionWhereInputObjectSchema.optional() }).strict();
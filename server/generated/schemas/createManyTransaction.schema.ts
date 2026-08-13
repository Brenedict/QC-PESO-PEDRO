import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionCreateManyInputObjectSchema as TransactionCreateManyInputObjectSchema } from './objects/TransactionCreateManyInput.schema';

export const TransactionCreateManySchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({ data: z.union([ TransactionCreateManyInputObjectSchema, z.array(TransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TransactionCreateManyArgs>;

export const TransactionCreateManyZodSchema = z.object({ data: z.union([ TransactionCreateManyInputObjectSchema, z.array(TransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionCreateManyInputObjectSchema as TransactionCreateManyInputObjectSchema } from './objects/TransactionCreateManyInput.schema';

export const TransactionCreateManyAndReturnSchema: z.ZodType<Prisma.TransactionCreateManyAndReturnArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), data: z.union([ TransactionCreateManyInputObjectSchema, z.array(TransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TransactionCreateManyAndReturnArgs>;

export const TransactionCreateManyAndReturnZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), data: z.union([ TransactionCreateManyInputObjectSchema, z.array(TransactionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
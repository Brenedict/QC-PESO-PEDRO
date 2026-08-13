import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';
import { TransactionCreateInputObjectSchema as TransactionCreateInputObjectSchema } from './objects/TransactionCreateInput.schema';
import { TransactionUncheckedCreateInputObjectSchema as TransactionUncheckedCreateInputObjectSchema } from './objects/TransactionUncheckedCreateInput.schema';
import { TransactionUpdateInputObjectSchema as TransactionUpdateInputObjectSchema } from './objects/TransactionUpdateInput.schema';
import { TransactionUncheckedUpdateInputObjectSchema as TransactionUncheckedUpdateInputObjectSchema } from './objects/TransactionUncheckedUpdateInput.schema';

export const TransactionUpsertOneSchema: z.ZodType<Prisma.TransactionUpsertArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), where: TransactionWhereUniqueInputObjectSchema, create: z.union([ TransactionCreateInputObjectSchema, TransactionUncheckedCreateInputObjectSchema ]), update: z.union([ TransactionUpdateInputObjectSchema, TransactionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.TransactionUpsertArgs>;

export const TransactionUpsertOneZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), where: TransactionWhereUniqueInputObjectSchema, create: z.union([ TransactionCreateInputObjectSchema, TransactionUncheckedCreateInputObjectSchema ]), update: z.union([ TransactionUpdateInputObjectSchema, TransactionUncheckedUpdateInputObjectSchema ]) }).strict();
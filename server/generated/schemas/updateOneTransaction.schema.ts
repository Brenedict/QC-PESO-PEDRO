import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionUpdateInputObjectSchema as TransactionUpdateInputObjectSchema } from './objects/TransactionUpdateInput.schema';
import { TransactionUncheckedUpdateInputObjectSchema as TransactionUncheckedUpdateInputObjectSchema } from './objects/TransactionUncheckedUpdateInput.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';

export const TransactionUpdateOneSchema: z.ZodType<Prisma.TransactionUpdateArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), data: z.union([TransactionUpdateInputObjectSchema, TransactionUncheckedUpdateInputObjectSchema]), where: TransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TransactionUpdateArgs>;

export const TransactionUpdateOneZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), data: z.union([TransactionUpdateInputObjectSchema, TransactionUncheckedUpdateInputObjectSchema]), where: TransactionWhereUniqueInputObjectSchema }).strict();
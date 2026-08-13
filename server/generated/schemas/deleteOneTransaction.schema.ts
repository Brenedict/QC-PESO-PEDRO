import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';

export const TransactionDeleteOneSchema: z.ZodType<Prisma.TransactionDeleteArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), where: TransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TransactionDeleteArgs>;

export const TransactionDeleteOneZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), where: TransactionWhereUniqueInputObjectSchema }).strict();
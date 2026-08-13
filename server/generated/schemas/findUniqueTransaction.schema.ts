import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';

export const TransactionFindUniqueSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), where: TransactionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TransactionFindUniqueArgs>;

export const TransactionFindUniqueZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), where: TransactionWhereUniqueInputObjectSchema }).strict();
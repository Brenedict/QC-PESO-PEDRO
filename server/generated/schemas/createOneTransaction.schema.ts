import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionCreateInputObjectSchema as TransactionCreateInputObjectSchema } from './objects/TransactionCreateInput.schema';
import { TransactionUncheckedCreateInputObjectSchema as TransactionUncheckedCreateInputObjectSchema } from './objects/TransactionUncheckedCreateInput.schema';

export const TransactionCreateOneSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), data: z.union([TransactionCreateInputObjectSchema, TransactionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.TransactionCreateArgs>;

export const TransactionCreateOneZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), include: TransactionIncludeObjectSchema.optional(), data: z.union([TransactionCreateInputObjectSchema, TransactionUncheckedCreateInputObjectSchema]) }).strict();
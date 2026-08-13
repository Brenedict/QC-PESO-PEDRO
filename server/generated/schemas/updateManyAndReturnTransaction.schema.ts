import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './objects/TransactionSelect.schema';
import { TransactionUpdateManyMutationInputObjectSchema as TransactionUpdateManyMutationInputObjectSchema } from './objects/TransactionUpdateManyMutationInput.schema';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './objects/TransactionWhereInput.schema';

export const TransactionUpdateManyAndReturnSchema: z.ZodType<Prisma.TransactionUpdateManyAndReturnArgs> = z.object({ select: TransactionSelectObjectSchema.optional(), data: TransactionUpdateManyMutationInputObjectSchema, where: TransactionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TransactionUpdateManyAndReturnArgs>;

export const TransactionUpdateManyAndReturnZodSchema = z.object({ select: TransactionSelectObjectSchema.optional(), data: TransactionUpdateManyMutationInputObjectSchema, where: TransactionWhereInputObjectSchema.optional() }).strict();
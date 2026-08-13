import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionUpdateManyMutationInputObjectSchema as TransactionUpdateManyMutationInputObjectSchema } from './objects/TransactionUpdateManyMutationInput.schema';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './objects/TransactionWhereInput.schema';

export const TransactionUpdateManySchema: z.ZodType<Prisma.TransactionUpdateManyArgs> = z.object({ data: TransactionUpdateManyMutationInputObjectSchema, where: TransactionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TransactionUpdateManyArgs>;

export const TransactionUpdateManyZodSchema = z.object({ data: TransactionUpdateManyMutationInputObjectSchema, where: TransactionWhereInputObjectSchema.optional() }).strict();
import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionOrderByWithRelationInputObjectSchema as TransactionOrderByWithRelationInputObjectSchema } from './objects/TransactionOrderByWithRelationInput.schema';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './objects/TransactionWhereInput.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';
import { TransactionCountAggregateInputObjectSchema as TransactionCountAggregateInputObjectSchema } from './objects/TransactionCountAggregateInput.schema';

export const TransactionCountSchema: z.ZodType<Prisma.TransactionCountArgs> = z.object({ orderBy: z.union([TransactionOrderByWithRelationInputObjectSchema, TransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: TransactionWhereInputObjectSchema.optional(), cursor: TransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TransactionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.TransactionCountArgs>;

export const TransactionCountZodSchema = z.object({ orderBy: z.union([TransactionOrderByWithRelationInputObjectSchema, TransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: TransactionWhereInputObjectSchema.optional(), cursor: TransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TransactionCountAggregateInputObjectSchema ]).optional() }).strict();
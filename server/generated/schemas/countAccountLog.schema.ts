import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogOrderByWithRelationInputObjectSchema as AccountLogOrderByWithRelationInputObjectSchema } from './objects/AccountLogOrderByWithRelationInput.schema';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './objects/AccountLogWhereInput.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './objects/AccountLogWhereUniqueInput.schema';
import { AccountLogCountAggregateInputObjectSchema as AccountLogCountAggregateInputObjectSchema } from './objects/AccountLogCountAggregateInput.schema';

export const AccountLogCountSchema: z.ZodType<Prisma.AccountLogCountArgs> = z.object({ orderBy: z.union([AccountLogOrderByWithRelationInputObjectSchema, AccountLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AccountLogWhereInputObjectSchema.optional(), cursor: AccountLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AccountLogCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogCountArgs>;

export const AccountLogCountZodSchema = z.object({ orderBy: z.union([AccountLogOrderByWithRelationInputObjectSchema, AccountLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AccountLogWhereInputObjectSchema.optional(), cursor: AccountLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AccountLogCountAggregateInputObjectSchema ]).optional() }).strict();
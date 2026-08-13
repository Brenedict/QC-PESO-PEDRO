import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogOrderByWithRelationInputObjectSchema as ShiftLogOrderByWithRelationInputObjectSchema } from './objects/ShiftLogOrderByWithRelationInput.schema';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './objects/ShiftLogWhereInput.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './objects/ShiftLogWhereUniqueInput.schema';
import { ShiftLogCountAggregateInputObjectSchema as ShiftLogCountAggregateInputObjectSchema } from './objects/ShiftLogCountAggregateInput.schema';

export const ShiftLogCountSchema: z.ZodType<Prisma.ShiftLogCountArgs> = z.object({ orderBy: z.union([ShiftLogOrderByWithRelationInputObjectSchema, ShiftLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShiftLogWhereInputObjectSchema.optional(), cursor: ShiftLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ShiftLogCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogCountArgs>;

export const ShiftLogCountZodSchema = z.object({ orderBy: z.union([ShiftLogOrderByWithRelationInputObjectSchema, ShiftLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShiftLogWhereInputObjectSchema.optional(), cursor: ShiftLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ShiftLogCountAggregateInputObjectSchema ]).optional() }).strict();
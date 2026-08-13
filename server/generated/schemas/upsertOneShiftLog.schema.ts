import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './objects/ShiftLogSelect.schema';
import { ShiftLogIncludeObjectSchema as ShiftLogIncludeObjectSchema } from './objects/ShiftLogInclude.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './objects/ShiftLogWhereUniqueInput.schema';
import { ShiftLogCreateInputObjectSchema as ShiftLogCreateInputObjectSchema } from './objects/ShiftLogCreateInput.schema';
import { ShiftLogUncheckedCreateInputObjectSchema as ShiftLogUncheckedCreateInputObjectSchema } from './objects/ShiftLogUncheckedCreateInput.schema';
import { ShiftLogUpdateInputObjectSchema as ShiftLogUpdateInputObjectSchema } from './objects/ShiftLogUpdateInput.schema';
import { ShiftLogUncheckedUpdateInputObjectSchema as ShiftLogUncheckedUpdateInputObjectSchema } from './objects/ShiftLogUncheckedUpdateInput.schema';

export const ShiftLogUpsertOneSchema: z.ZodType<Prisma.ShiftLogUpsertArgs> = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), where: ShiftLogWhereUniqueInputObjectSchema, create: z.union([ ShiftLogCreateInputObjectSchema, ShiftLogUncheckedCreateInputObjectSchema ]), update: z.union([ ShiftLogUpdateInputObjectSchema, ShiftLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ShiftLogUpsertArgs>;

export const ShiftLogUpsertOneZodSchema = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), where: ShiftLogWhereUniqueInputObjectSchema, create: z.union([ ShiftLogCreateInputObjectSchema, ShiftLogUncheckedCreateInputObjectSchema ]), update: z.union([ ShiftLogUpdateInputObjectSchema, ShiftLogUncheckedUpdateInputObjectSchema ]) }).strict();
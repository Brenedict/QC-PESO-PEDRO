import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './objects/ShiftLogSelect.schema';
import { ShiftLogIncludeObjectSchema as ShiftLogIncludeObjectSchema } from './objects/ShiftLogInclude.schema';
import { ShiftLogUpdateInputObjectSchema as ShiftLogUpdateInputObjectSchema } from './objects/ShiftLogUpdateInput.schema';
import { ShiftLogUncheckedUpdateInputObjectSchema as ShiftLogUncheckedUpdateInputObjectSchema } from './objects/ShiftLogUncheckedUpdateInput.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './objects/ShiftLogWhereUniqueInput.schema';

export const ShiftLogUpdateOneSchema: z.ZodType<Prisma.ShiftLogUpdateArgs> = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), data: z.union([ShiftLogUpdateInputObjectSchema, ShiftLogUncheckedUpdateInputObjectSchema]), where: ShiftLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ShiftLogUpdateArgs>;

export const ShiftLogUpdateOneZodSchema = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), data: z.union([ShiftLogUpdateInputObjectSchema, ShiftLogUncheckedUpdateInputObjectSchema]), where: ShiftLogWhereUniqueInputObjectSchema }).strict();
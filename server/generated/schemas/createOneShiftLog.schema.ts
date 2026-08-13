import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './objects/ShiftLogSelect.schema';
import { ShiftLogIncludeObjectSchema as ShiftLogIncludeObjectSchema } from './objects/ShiftLogInclude.schema';
import { ShiftLogCreateInputObjectSchema as ShiftLogCreateInputObjectSchema } from './objects/ShiftLogCreateInput.schema';
import { ShiftLogUncheckedCreateInputObjectSchema as ShiftLogUncheckedCreateInputObjectSchema } from './objects/ShiftLogUncheckedCreateInput.schema';

export const ShiftLogCreateOneSchema: z.ZodType<Prisma.ShiftLogCreateArgs> = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), data: z.union([ShiftLogCreateInputObjectSchema, ShiftLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ShiftLogCreateArgs>;

export const ShiftLogCreateOneZodSchema = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), data: z.union([ShiftLogCreateInputObjectSchema, ShiftLogUncheckedCreateInputObjectSchema]) }).strict();
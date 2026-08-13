import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './objects/ShiftLogSelect.schema';
import { ShiftLogCreateManyInputObjectSchema as ShiftLogCreateManyInputObjectSchema } from './objects/ShiftLogCreateManyInput.schema';

export const ShiftLogCreateManyAndReturnSchema: z.ZodType<Prisma.ShiftLogCreateManyAndReturnArgs> = z.object({ select: ShiftLogSelectObjectSchema.optional(), data: z.union([ ShiftLogCreateManyInputObjectSchema, z.array(ShiftLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogCreateManyAndReturnArgs>;

export const ShiftLogCreateManyAndReturnZodSchema = z.object({ select: ShiftLogSelectObjectSchema.optional(), data: z.union([ ShiftLogCreateManyInputObjectSchema, z.array(ShiftLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
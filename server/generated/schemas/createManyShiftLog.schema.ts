import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogCreateManyInputObjectSchema as ShiftLogCreateManyInputObjectSchema } from './objects/ShiftLogCreateManyInput.schema';

export const ShiftLogCreateManySchema: z.ZodType<Prisma.ShiftLogCreateManyArgs> = z.object({ data: z.union([ ShiftLogCreateManyInputObjectSchema, z.array(ShiftLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogCreateManyArgs>;

export const ShiftLogCreateManyZodSchema = z.object({ data: z.union([ ShiftLogCreateManyInputObjectSchema, z.array(ShiftLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
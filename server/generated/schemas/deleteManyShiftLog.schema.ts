import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './objects/ShiftLogWhereInput.schema';

export const ShiftLogDeleteManySchema: z.ZodType<Prisma.ShiftLogDeleteManyArgs> = z.object({ where: ShiftLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogDeleteManyArgs>;

export const ShiftLogDeleteManyZodSchema = z.object({ where: ShiftLogWhereInputObjectSchema.optional() }).strict();
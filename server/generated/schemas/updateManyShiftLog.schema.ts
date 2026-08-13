import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogUpdateManyMutationInputObjectSchema as ShiftLogUpdateManyMutationInputObjectSchema } from './objects/ShiftLogUpdateManyMutationInput.schema';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './objects/ShiftLogWhereInput.schema';

export const ShiftLogUpdateManySchema: z.ZodType<Prisma.ShiftLogUpdateManyArgs> = z.object({ data: ShiftLogUpdateManyMutationInputObjectSchema, where: ShiftLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogUpdateManyArgs>;

export const ShiftLogUpdateManyZodSchema = z.object({ data: ShiftLogUpdateManyMutationInputObjectSchema, where: ShiftLogWhereInputObjectSchema.optional() }).strict();
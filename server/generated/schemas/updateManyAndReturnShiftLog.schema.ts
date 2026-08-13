import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './objects/ShiftLogSelect.schema';
import { ShiftLogUpdateManyMutationInputObjectSchema as ShiftLogUpdateManyMutationInputObjectSchema } from './objects/ShiftLogUpdateManyMutationInput.schema';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './objects/ShiftLogWhereInput.schema';

export const ShiftLogUpdateManyAndReturnSchema: z.ZodType<Prisma.ShiftLogUpdateManyAndReturnArgs> = z.object({ select: ShiftLogSelectObjectSchema.optional(), data: ShiftLogUpdateManyMutationInputObjectSchema, where: ShiftLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogUpdateManyAndReturnArgs>;

export const ShiftLogUpdateManyAndReturnZodSchema = z.object({ select: ShiftLogSelectObjectSchema.optional(), data: ShiftLogUpdateManyMutationInputObjectSchema, where: ShiftLogWhereInputObjectSchema.optional() }).strict();
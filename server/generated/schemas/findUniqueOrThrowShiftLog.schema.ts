import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './objects/ShiftLogSelect.schema';
import { ShiftLogIncludeObjectSchema as ShiftLogIncludeObjectSchema } from './objects/ShiftLogInclude.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './objects/ShiftLogWhereUniqueInput.schema';

export const ShiftLogFindUniqueOrThrowSchema: z.ZodType<Prisma.ShiftLogFindUniqueOrThrowArgs> = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), where: ShiftLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ShiftLogFindUniqueOrThrowArgs>;

export const ShiftLogFindUniqueOrThrowZodSchema = z.object({ select: ShiftLogSelectObjectSchema.optional(), include: ShiftLogIncludeObjectSchema.optional(), where: ShiftLogWhereUniqueInputObjectSchema }).strict();
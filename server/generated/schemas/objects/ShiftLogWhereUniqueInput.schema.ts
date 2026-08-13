import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const ShiftLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.ShiftLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogWhereUniqueInput>;
export const ShiftLogWhereUniqueInputObjectZodSchema = makeSchema();

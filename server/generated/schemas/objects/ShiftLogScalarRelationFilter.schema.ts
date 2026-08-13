import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './ShiftLogWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ShiftLogWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ShiftLogWhereInputObjectSchema).optional()
}).strict();
export const ShiftLogScalarRelationFilterObjectSchema: z.ZodType<Prisma.ShiftLogScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogScalarRelationFilter>;
export const ShiftLogScalarRelationFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './ShiftLogWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ShiftLogWhereInputObjectSchema).optional(),
  some: z.lazy(() => ShiftLogWhereInputObjectSchema).optional(),
  none: z.lazy(() => ShiftLogWhereInputObjectSchema).optional()
}).strict();
export const ShiftLogListRelationFilterObjectSchema: z.ZodType<Prisma.ShiftLogListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogListRelationFilter>;
export const ShiftLogListRelationFilterObjectZodSchema = makeSchema();

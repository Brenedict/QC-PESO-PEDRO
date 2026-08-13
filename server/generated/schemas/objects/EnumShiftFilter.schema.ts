import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftSchema } from '../enums/Shift.schema';
import { NestedEnumShiftFilterObjectSchema as NestedEnumShiftFilterObjectSchema } from './NestedEnumShiftFilter.schema'

const makeSchema = () => z.object({
  equals: ShiftSchema.optional(),
  in: ShiftSchema.array().optional(),
  notIn: ShiftSchema.array().optional(),
  not: z.union([ShiftSchema, z.lazy(() => NestedEnumShiftFilterObjectSchema)]).optional()
}).strict();
export const EnumShiftFilterObjectSchema: z.ZodType<Prisma.EnumShiftFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumShiftFilter>;
export const EnumShiftFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftSchema } from '../enums/Shift.schema'

const nestedenumshiftfilterSchema = z.object({
  equals: ShiftSchema.optional(),
  in: ShiftSchema.array().optional(),
  notIn: ShiftSchema.array().optional(),
  not: z.union([ShiftSchema, z.lazy(() => NestedEnumShiftFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumShiftFilterObjectSchema: z.ZodType<Prisma.NestedEnumShiftFilter> = nestedenumshiftfilterSchema as unknown as z.ZodType<Prisma.NestedEnumShiftFilter>;
export const NestedEnumShiftFilterObjectZodSchema = nestedenumshiftfilterSchema;

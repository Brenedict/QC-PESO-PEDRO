import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftSchema } from '../enums/Shift.schema';
import { NestedEnumShiftWithAggregatesFilterObjectSchema as NestedEnumShiftWithAggregatesFilterObjectSchema } from './NestedEnumShiftWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumShiftFilterObjectSchema as NestedEnumShiftFilterObjectSchema } from './NestedEnumShiftFilter.schema'

const makeSchema = () => z.object({
  equals: ShiftSchema.optional(),
  in: ShiftSchema.array().optional(),
  notIn: ShiftSchema.array().optional(),
  not: z.union([ShiftSchema, z.lazy(() => NestedEnumShiftWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumShiftFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumShiftFilterObjectSchema).optional()
}).strict();
export const EnumShiftWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumShiftWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumShiftWithAggregatesFilter>;
export const EnumShiftWithAggregatesFilterObjectZodSchema = makeSchema();

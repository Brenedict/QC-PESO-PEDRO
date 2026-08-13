import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema';
import { NestedEnumSexWithAggregatesFilterObjectSchema as NestedEnumSexWithAggregatesFilterObjectSchema } from './NestedEnumSexWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSexFilterObjectSchema as NestedEnumSexFilterObjectSchema } from './NestedEnumSexFilter.schema'

const makeSchema = () => z.object({
  equals: SexSchema.optional(),
  in: SexSchema.array().optional(),
  notIn: SexSchema.array().optional(),
  not: z.union([SexSchema, z.lazy(() => NestedEnumSexWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSexFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSexFilterObjectSchema).optional()
}).strict();
export const EnumSexWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumSexWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSexWithAggregatesFilter>;
export const EnumSexWithAggregatesFilterObjectZodSchema = makeSchema();

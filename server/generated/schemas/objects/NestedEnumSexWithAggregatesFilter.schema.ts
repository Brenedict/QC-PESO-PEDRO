import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSexFilterObjectSchema as NestedEnumSexFilterObjectSchema } from './NestedEnumSexFilter.schema'

const nestedenumsexwithaggregatesfilterSchema = z.object({
  equals: SexSchema.optional(),
  in: SexSchema.array().optional(),
  notIn: SexSchema.array().optional(),
  not: z.union([SexSchema, z.lazy(() => NestedEnumSexWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSexFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSexFilterObjectSchema).optional()
}).strict();
export const NestedEnumSexWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSexWithAggregatesFilter> = nestedenumsexwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSexWithAggregatesFilter>;
export const NestedEnumSexWithAggregatesFilterObjectZodSchema = nestedenumsexwithaggregatesfilterSchema;

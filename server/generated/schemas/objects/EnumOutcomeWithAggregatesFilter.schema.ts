import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { NestedEnumOutcomeWithAggregatesFilterObjectSchema as NestedEnumOutcomeWithAggregatesFilterObjectSchema } from './NestedEnumOutcomeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumOutcomeFilterObjectSchema as NestedEnumOutcomeFilterObjectSchema } from './NestedEnumOutcomeFilter.schema'

const makeSchema = () => z.object({
  equals: OutcomeSchema.optional(),
  in: OutcomeSchema.array().optional(),
  notIn: OutcomeSchema.array().optional(),
  not: z.union([OutcomeSchema, z.lazy(() => NestedEnumOutcomeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumOutcomeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumOutcomeFilterObjectSchema).optional()
}).strict();
export const EnumOutcomeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumOutcomeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumOutcomeWithAggregatesFilter>;
export const EnumOutcomeWithAggregatesFilterObjectZodSchema = makeSchema();

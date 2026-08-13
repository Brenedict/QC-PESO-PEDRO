import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { NestedEnumESSStatusWithAggregatesFilterObjectSchema as NestedEnumESSStatusWithAggregatesFilterObjectSchema } from './NestedEnumESSStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumESSStatusFilterObjectSchema as NestedEnumESSStatusFilterObjectSchema } from './NestedEnumESSStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ESSStatusSchema.optional(),
  in: ESSStatusSchema.array().optional(),
  notIn: ESSStatusSchema.array().optional(),
  not: z.union([ESSStatusSchema, z.lazy(() => NestedEnumESSStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumESSStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumESSStatusFilterObjectSchema).optional()
}).strict();
export const EnumESSStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumESSStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumESSStatusWithAggregatesFilter>;
export const EnumESSStatusWithAggregatesFilterObjectZodSchema = makeSchema();

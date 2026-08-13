import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumLogActionFilterObjectSchema as NestedEnumLogActionFilterObjectSchema } from './NestedEnumLogActionFilter.schema'

const nestedenumlogactionwithaggregatesfilterSchema = z.object({
  equals: LogActionSchema.optional(),
  in: LogActionSchema.array().optional(),
  notIn: LogActionSchema.array().optional(),
  not: z.union([LogActionSchema, z.lazy(() => NestedEnumLogActionWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumLogActionFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumLogActionFilterObjectSchema).optional()
}).strict();
export const NestedEnumLogActionWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumLogActionWithAggregatesFilter> = nestedenumlogactionwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumLogActionWithAggregatesFilter>;
export const NestedEnumLogActionWithAggregatesFilterObjectZodSchema = nestedenumlogactionwithaggregatesfilterSchema;

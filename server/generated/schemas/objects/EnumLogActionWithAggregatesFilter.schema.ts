import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema';
import { NestedEnumLogActionWithAggregatesFilterObjectSchema as NestedEnumLogActionWithAggregatesFilterObjectSchema } from './NestedEnumLogActionWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumLogActionFilterObjectSchema as NestedEnumLogActionFilterObjectSchema } from './NestedEnumLogActionFilter.schema'

const makeSchema = () => z.object({
  equals: LogActionSchema.optional(),
  in: LogActionSchema.array().optional(),
  notIn: LogActionSchema.array().optional(),
  not: z.union([LogActionSchema, z.lazy(() => NestedEnumLogActionWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumLogActionFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumLogActionFilterObjectSchema).optional()
}).strict();
export const EnumLogActionWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumLogActionWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumLogActionWithAggregatesFilter>;
export const EnumLogActionWithAggregatesFilterObjectZodSchema = makeSchema();

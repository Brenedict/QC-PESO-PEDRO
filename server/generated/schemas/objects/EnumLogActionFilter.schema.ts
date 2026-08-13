import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema';
import { NestedEnumLogActionFilterObjectSchema as NestedEnumLogActionFilterObjectSchema } from './NestedEnumLogActionFilter.schema'

const makeSchema = () => z.object({
  equals: LogActionSchema.optional(),
  in: LogActionSchema.array().optional(),
  notIn: LogActionSchema.array().optional(),
  not: z.union([LogActionSchema, z.lazy(() => NestedEnumLogActionFilterObjectSchema)]).optional()
}).strict();
export const EnumLogActionFilterObjectSchema: z.ZodType<Prisma.EnumLogActionFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumLogActionFilter>;
export const EnumLogActionFilterObjectZodSchema = makeSchema();

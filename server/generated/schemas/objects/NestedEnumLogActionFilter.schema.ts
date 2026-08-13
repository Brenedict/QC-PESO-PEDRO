import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema'

const nestedenumlogactionfilterSchema = z.object({
  equals: LogActionSchema.optional(),
  in: LogActionSchema.array().optional(),
  notIn: LogActionSchema.array().optional(),
  not: z.union([LogActionSchema, z.lazy(() => NestedEnumLogActionFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumLogActionFilterObjectSchema: z.ZodType<Prisma.NestedEnumLogActionFilter> = nestedenumlogactionfilterSchema as unknown as z.ZodType<Prisma.NestedEnumLogActionFilter>;
export const NestedEnumLogActionFilterObjectZodSchema = nestedenumlogactionfilterSchema;

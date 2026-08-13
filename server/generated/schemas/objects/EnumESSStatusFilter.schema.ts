import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { NestedEnumESSStatusFilterObjectSchema as NestedEnumESSStatusFilterObjectSchema } from './NestedEnumESSStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ESSStatusSchema.optional(),
  in: ESSStatusSchema.array().optional(),
  notIn: ESSStatusSchema.array().optional(),
  not: z.union([ESSStatusSchema, z.lazy(() => NestedEnumESSStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumESSStatusFilterObjectSchema: z.ZodType<Prisma.EnumESSStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumESSStatusFilter>;
export const EnumESSStatusFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema'

const nestedenumessstatusfilterSchema = z.object({
  equals: ESSStatusSchema.optional(),
  in: ESSStatusSchema.array().optional(),
  notIn: ESSStatusSchema.array().optional(),
  not: z.union([ESSStatusSchema, z.lazy(() => NestedEnumESSStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumESSStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumESSStatusFilter> = nestedenumessstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumESSStatusFilter>;
export const NestedEnumESSStatusFilterObjectZodSchema = nestedenumessstatusfilterSchema;

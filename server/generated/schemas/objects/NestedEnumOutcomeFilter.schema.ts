import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { OutcomeSchema } from '../enums/Outcome.schema'

const nestedenumoutcomefilterSchema = z.object({
  equals: OutcomeSchema.optional(),
  in: OutcomeSchema.array().optional(),
  notIn: OutcomeSchema.array().optional(),
  not: z.union([OutcomeSchema, z.lazy(() => NestedEnumOutcomeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumOutcomeFilterObjectSchema: z.ZodType<Prisma.NestedEnumOutcomeFilter> = nestedenumoutcomefilterSchema as unknown as z.ZodType<Prisma.NestedEnumOutcomeFilter>;
export const NestedEnumOutcomeFilterObjectZodSchema = nestedenumoutcomefilterSchema;

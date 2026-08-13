import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { NestedEnumOutcomeFilterObjectSchema as NestedEnumOutcomeFilterObjectSchema } from './NestedEnumOutcomeFilter.schema'

const makeSchema = () => z.object({
  equals: OutcomeSchema.optional(),
  in: OutcomeSchema.array().optional(),
  notIn: OutcomeSchema.array().optional(),
  not: z.union([OutcomeSchema, z.lazy(() => NestedEnumOutcomeFilterObjectSchema)]).optional()
}).strict();
export const EnumOutcomeFilterObjectSchema: z.ZodType<Prisma.EnumOutcomeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumOutcomeFilter>;
export const EnumOutcomeFilterObjectZodSchema = makeSchema();

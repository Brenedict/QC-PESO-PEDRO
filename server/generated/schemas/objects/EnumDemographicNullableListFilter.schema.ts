import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { DemographicSchema } from '../enums/Demographic.schema'

const makeSchema = () => z.object({
  equals: DemographicSchema.array().optional().nullable(),
  has: DemographicSchema.optional().nullable(),
  hasEvery: DemographicSchema.array().optional(),
  hasSome: DemographicSchema.array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const EnumDemographicNullableListFilterObjectSchema: z.ZodType<Prisma.EnumDemographicNullableListFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDemographicNullableListFilter>;
export const EnumDemographicNullableListFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema'

const makeSchema = () => z.object({
  equals: EnvironmentTagSchema.array().optional().nullable(),
  has: EnvironmentTagSchema.optional().nullable(),
  hasEvery: EnvironmentTagSchema.array().optional(),
  hasSome: EnvironmentTagSchema.array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const EnumEnvironmentTagNullableListFilterObjectSchema: z.ZodType<Prisma.EnumEnvironmentTagNullableListFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEnvironmentTagNullableListFilter>;
export const EnumEnvironmentTagNullableListFilterObjectZodSchema = makeSchema();

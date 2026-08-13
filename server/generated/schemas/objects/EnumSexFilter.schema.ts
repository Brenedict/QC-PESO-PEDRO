import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema';
import { NestedEnumSexFilterObjectSchema as NestedEnumSexFilterObjectSchema } from './NestedEnumSexFilter.schema'

const makeSchema = () => z.object({
  equals: SexSchema.optional(),
  in: SexSchema.array().optional(),
  notIn: SexSchema.array().optional(),
  not: z.union([SexSchema, z.lazy(() => NestedEnumSexFilterObjectSchema)]).optional()
}).strict();
export const EnumSexFilterObjectSchema: z.ZodType<Prisma.EnumSexFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSexFilter>;
export const EnumSexFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema'

const nestedenumsexfilterSchema = z.object({
  equals: SexSchema.optional(),
  in: SexSchema.array().optional(),
  notIn: SexSchema.array().optional(),
  not: z.union([SexSchema, z.lazy(() => NestedEnumSexFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSexFilterObjectSchema: z.ZodType<Prisma.NestedEnumSexFilter> = nestedenumsexfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSexFilter>;
export const NestedEnumSexFilterObjectZodSchema = nestedenumsexfilterSchema;

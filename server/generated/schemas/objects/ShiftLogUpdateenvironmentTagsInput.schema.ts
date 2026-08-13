import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema'

const makeSchema = () => z.object({
  set: EnvironmentTagSchema.array().optional(),
  push: z.union([EnvironmentTagSchema, EnvironmentTagSchema.array()]).optional()
}).strict();
export const ShiftLogUpdateenvironmentTagsInputObjectSchema: z.ZodType<Prisma.ShiftLogUpdateenvironmentTagsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpdateenvironmentTagsInput>;
export const ShiftLogUpdateenvironmentTagsInputObjectZodSchema = makeSchema();

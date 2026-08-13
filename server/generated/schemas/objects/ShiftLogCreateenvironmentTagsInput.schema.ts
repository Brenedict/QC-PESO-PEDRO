import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema'

const makeSchema = () => z.object({
  set: EnvironmentTagSchema.array()
}).strict();
export const ShiftLogCreateenvironmentTagsInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateenvironmentTagsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateenvironmentTagsInput>;
export const ShiftLogCreateenvironmentTagsInputObjectZodSchema = makeSchema();

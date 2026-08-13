import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { DemographicSchema } from '../enums/Demographic.schema'

const makeSchema = () => z.object({
  set: DemographicSchema.array().optional(),
  push: z.union([DemographicSchema, DemographicSchema.array()]).optional()
}).strict();
export const TransactionUpdatedemographicsInputObjectSchema: z.ZodType<Prisma.TransactionUpdatedemographicsInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdatedemographicsInput>;
export const TransactionUpdatedemographicsInputObjectZodSchema = makeSchema();

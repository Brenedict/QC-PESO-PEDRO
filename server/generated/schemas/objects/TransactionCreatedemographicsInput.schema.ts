import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { DemographicSchema } from '../enums/Demographic.schema'

const makeSchema = () => z.object({
  set: DemographicSchema.array()
}).strict();
export const TransactionCreatedemographicsInputObjectSchema: z.ZodType<Prisma.TransactionCreatedemographicsInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreatedemographicsInput>;
export const TransactionCreatedemographicsInputObjectZodSchema = makeSchema();

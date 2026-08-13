import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { OutcomeSchema } from '../enums/Outcome.schema'

const makeSchema = () => z.object({
  set: OutcomeSchema.optional()
}).strict();
export const EnumOutcomeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumOutcomeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumOutcomeFieldUpdateOperationsInput>;
export const EnumOutcomeFieldUpdateOperationsInputObjectZodSchema = makeSchema();

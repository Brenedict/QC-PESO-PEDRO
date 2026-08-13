import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema'

const makeSchema = () => z.object({
  set: ESSStatusSchema.optional()
}).strict();
export const EnumESSStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumESSStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumESSStatusFieldUpdateOperationsInput>;
export const EnumESSStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();

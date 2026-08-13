import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { StatusSchema } from '../enums/Status.schema'

const makeSchema = () => z.object({
  set: StatusSchema.optional()
}).strict();
export const EnumStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput>;
export const EnumStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();

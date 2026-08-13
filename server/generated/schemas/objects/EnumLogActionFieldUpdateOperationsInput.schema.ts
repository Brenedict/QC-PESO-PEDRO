import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema'

const makeSchema = () => z.object({
  set: LogActionSchema.optional()
}).strict();
export const EnumLogActionFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumLogActionFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumLogActionFieldUpdateOperationsInput>;
export const EnumLogActionFieldUpdateOperationsInputObjectZodSchema = makeSchema();

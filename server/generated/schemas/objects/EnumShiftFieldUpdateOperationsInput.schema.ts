import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftSchema } from '../enums/Shift.schema'

const makeSchema = () => z.object({
  set: ShiftSchema.optional()
}).strict();
export const EnumShiftFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumShiftFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumShiftFieldUpdateOperationsInput>;
export const EnumShiftFieldUpdateOperationsInputObjectZodSchema = makeSchema();

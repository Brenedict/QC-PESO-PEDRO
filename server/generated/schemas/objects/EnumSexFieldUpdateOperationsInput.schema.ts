import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema'

const makeSchema = () => z.object({
  set: SexSchema.optional()
}).strict();
export const EnumSexFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumSexFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumSexFieldUpdateOperationsInput>;
export const EnumSexFieldUpdateOperationsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LogActionSchema } from '../enums/LogAction.schema';
import { EnumLogActionFieldUpdateOperationsInputObjectSchema as EnumLogActionFieldUpdateOperationsInputObjectSchema } from './EnumLogActionFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  actionPerformed: z.union([LogActionSchema, z.lazy(() => EnumLogActionFieldUpdateOperationsInputObjectSchema)]).optional(),
  affectedRecordId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  changesDetails: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const AuditLogUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUncheckedUpdateWithoutUserInput>;
export const AuditLogUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();

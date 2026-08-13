import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LogActionSchema } from '../enums/LogAction.schema';
import { EnumLogActionFieldUpdateOperationsInputObjectSchema as EnumLogActionFieldUpdateOperationsInputObjectSchema } from './EnumLogActionFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAuditLogsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAuditLogsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAuditLogsNestedInput.schema'

const makeSchema = () => z.object({
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  actionPerformed: z.union([LogActionSchema, z.lazy(() => EnumLogActionFieldUpdateOperationsInputObjectSchema)]).optional(),
  affectedRecordId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  changesDetails: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuditLogsNestedInputObjectSchema).optional()
}).strict();
export const AuditLogUpdateInputObjectSchema: z.ZodType<Prisma.AuditLogUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUpdateInput>;
export const AuditLogUpdateInputObjectZodSchema = makeSchema();

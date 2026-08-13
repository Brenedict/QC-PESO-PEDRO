import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { EnumRoleFieldUpdateOperationsInputObjectSchema as EnumRoleFieldUpdateOperationsInputObjectSchema } from './EnumRoleFieldUpdateOperationsInput.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumStatusFieldUpdateOperationsInputObjectSchema as EnumStatusFieldUpdateOperationsInputObjectSchema } from './EnumStatusFieldUpdateOperationsInput.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { EnumShiftFieldUpdateOperationsInputObjectSchema as EnumShiftFieldUpdateOperationsInputObjectSchema } from './EnumShiftFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AuditLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AuditLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AuditLogUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AccountLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AccountLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AccountLogUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ShiftLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ShiftLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ShiftLogUncheckedUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([RoleSchema, z.lazy(() => EnumRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([StatusSchema, z.lazy(() => EnumStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  shift: z.union([ShiftSchema, z.lazy(() => EnumShiftFieldUpdateOperationsInputObjectSchema)]).optional(),
  firstName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  accountLogs: z.lazy(() => AccountLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  shiftLogs: z.lazy(() => ShiftLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutTransactionsInput>;
export const UserUncheckedUpdateWithoutTransactionsInputObjectZodSchema = makeSchema();

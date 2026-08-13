import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { RoleSchema } from '../enums/Role.schema';
import { EnumRoleFieldUpdateOperationsInputObjectSchema as EnumRoleFieldUpdateOperationsInputObjectSchema } from './EnumRoleFieldUpdateOperationsInput.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumStatusFieldUpdateOperationsInputObjectSchema as EnumStatusFieldUpdateOperationsInputObjectSchema } from './EnumStatusFieldUpdateOperationsInput.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { EnumShiftFieldUpdateOperationsInputObjectSchema as EnumShiftFieldUpdateOperationsInputObjectSchema } from './EnumShiftFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AuditLogUpdateManyWithoutUserNestedInputObjectSchema as AuditLogUpdateManyWithoutUserNestedInputObjectSchema } from './AuditLogUpdateManyWithoutUserNestedInput.schema';
import { AccountLogUpdateManyWithoutUserNestedInputObjectSchema as AccountLogUpdateManyWithoutUserNestedInputObjectSchema } from './AccountLogUpdateManyWithoutUserNestedInput.schema';
import { TransactionUpdateManyWithoutUserNestedInputObjectSchema as TransactionUpdateManyWithoutUserNestedInputObjectSchema } from './TransactionUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  username: z.union([z.string().max(256), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  password: z.union([z.string().max(256), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string().max(256), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([RoleSchema, z.lazy(() => EnumRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([StatusSchema, z.lazy(() => EnumStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  shift: z.union([ShiftSchema, z.lazy(() => EnumShiftFieldUpdateOperationsInputObjectSchema)]).optional(),
  firstName: z.union([z.string().max(256), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastName: z.union([z.string().max(256), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  accountLogs: z.lazy(() => AccountLogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  transactions: z.lazy(() => TransactionUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutShiftLogsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutShiftLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutShiftLogsInput>;
export const UserUpdateWithoutShiftLogsInputObjectZodSchema = makeSchema();

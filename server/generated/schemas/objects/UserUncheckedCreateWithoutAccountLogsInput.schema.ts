import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { RoleSchema } from '../enums/Role.schema';
import { StatusSchema } from '../enums/Status.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema as TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TransactionUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  role: RoleSchema.optional(),
  status: StatusSchema,
  shift: ShiftSchema,
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  shiftLogs: z.lazy(() => ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutAccountLogsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutAccountLogsInput>;
export const UserUncheckedCreateWithoutAccountLogsInputObjectZodSchema = makeSchema();

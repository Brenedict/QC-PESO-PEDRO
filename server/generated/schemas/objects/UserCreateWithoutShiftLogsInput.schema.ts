import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { RoleSchema } from '../enums/Role.schema';
import { StatusSchema } from '../enums/Status.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { AuditLogCreateNestedManyWithoutUserInputObjectSchema as AuditLogCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogCreateNestedManyWithoutUserInput.schema';
import { AccountLogCreateNestedManyWithoutUserInputObjectSchema as AccountLogCreateNestedManyWithoutUserInputObjectSchema } from './AccountLogCreateNestedManyWithoutUserInput.schema';
import { TransactionCreateNestedManyWithoutUserInputObjectSchema as TransactionCreateNestedManyWithoutUserInputObjectSchema } from './TransactionCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  username: z.string().max(256),
  password: z.string().max(256),
  email: z.string().max(256),
  role: RoleSchema.optional(),
  status: StatusSchema,
  shift: ShiftSchema,
  firstName: z.string().max(256),
  lastName: z.string().max(256),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accountLogs: z.lazy(() => AccountLogCreateNestedManyWithoutUserInputObjectSchema).optional(),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutShiftLogsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutShiftLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutShiftLogsInput>;
export const UserCreateWithoutShiftLogsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { RoleSchema } from '../enums/Role.schema';
import { StatusSchema } from '../enums/Status.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { AuditLogCreateNestedManyWithoutUserInputObjectSchema as AuditLogCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogCreateNestedManyWithoutUserInput.schema';
import { AccountLogCreateNestedManyWithoutUserInputObjectSchema as AccountLogCreateNestedManyWithoutUserInputObjectSchema } from './AccountLogCreateNestedManyWithoutUserInput.schema';
import { ShiftLogCreateNestedManyWithoutUserInputObjectSchema as ShiftLogCreateNestedManyWithoutUserInputObjectSchema } from './ShiftLogCreateNestedManyWithoutUserInput.schema'

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
  shiftLogs: z.lazy(() => ShiftLogCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutTransactionsInput>;
export const UserCreateWithoutTransactionsInputObjectZodSchema = makeSchema();

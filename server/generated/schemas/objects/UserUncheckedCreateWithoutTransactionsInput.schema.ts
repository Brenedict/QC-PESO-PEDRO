import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { RoleSchema } from '../enums/Role.schema';
import { StatusSchema } from '../enums/Status.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateNestedManyWithoutUserInput.schema'

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
  accountLogs: z.lazy(() => AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  shiftLogs: z.lazy(() => ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutTransactionsInput>;
export const UserUncheckedCreateWithoutTransactionsInputObjectZodSchema = makeSchema();

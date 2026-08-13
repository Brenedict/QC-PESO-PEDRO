import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { RoleSchema } from '../enums/Role.schema';
import { StatusSchema } from '../enums/Status.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AuditLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema as TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TransactionUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
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
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accountLogs: z.lazy(() => AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  shiftLogs: z.lazy(() => ShiftLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();

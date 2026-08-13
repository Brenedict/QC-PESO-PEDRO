import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumRoleFilterObjectSchema as EnumRoleFilterObjectSchema } from './EnumRoleFilter.schema';
import { RoleSchema } from '../enums/Role.schema';
import { EnumStatusFilterObjectSchema as EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumShiftFilterObjectSchema as EnumShiftFilterObjectSchema } from './EnumShiftFilter.schema';
import { ShiftSchema } from '../enums/Shift.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { AuditLogListRelationFilterObjectSchema as AuditLogListRelationFilterObjectSchema } from './AuditLogListRelationFilter.schema';
import { AccountLogListRelationFilterObjectSchema as AccountLogListRelationFilterObjectSchema } from './AccountLogListRelationFilter.schema';
import { ShiftLogListRelationFilterObjectSchema as ShiftLogListRelationFilterObjectSchema } from './ShiftLogListRelationFilter.schema';
import { TransactionListRelationFilterObjectSchema as TransactionListRelationFilterObjectSchema } from './TransactionListRelationFilter.schema'

const userwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  username: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256)]).optional(),
  password: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256)]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256)]).optional(),
  role: z.union([z.lazy(() => EnumRoleFilterObjectSchema), RoleSchema]).optional(),
  status: z.union([z.lazy(() => EnumStatusFilterObjectSchema), StatusSchema]).optional(),
  shift: z.union([z.lazy(() => EnumShiftFilterObjectSchema), ShiftSchema]).optional(),
  firstName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256)]).optional(),
  lastName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256)]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterObjectSchema).optional(),
  accountLogs: z.lazy(() => AccountLogListRelationFilterObjectSchema).optional(),
  shiftLogs: z.lazy(() => ShiftLogListRelationFilterObjectSchema).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterObjectSchema).optional()
}).strict();
export const UserWhereInputObjectSchema: z.ZodType<Prisma.UserWhereInput> = userwhereinputSchema as unknown as z.ZodType<Prisma.UserWhereInput>;
export const UserWhereInputObjectZodSchema = userwhereinputSchema;

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AuditLogFindManySchema as AuditLogFindManySchema } from '../findManyAuditLog.schema';
import { AccountLogFindManySchema as AccountLogFindManySchema } from '../findManyAccountLog.schema';
import { ShiftLogFindManySchema as ShiftLogFindManySchema } from '../findManyShiftLog.schema';
import { TransactionFindManySchema as TransactionFindManySchema } from '../findManyTransaction.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  auditLogs: z.union([z.boolean(), z.lazy(() => AuditLogFindManySchema)]).optional(),
  accountLogs: z.union([z.boolean(), z.lazy(() => AccountLogFindManySchema)]).optional(),
  shiftLogs: z.union([z.boolean(), z.lazy(() => ShiftLogFindManySchema)]).optional(),
  transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();

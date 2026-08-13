import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCountOutputTypeCountAuditLogsArgsObjectSchema as UserCountOutputTypeCountAuditLogsArgsObjectSchema } from './UserCountOutputTypeCountAuditLogsArgs.schema';
import { UserCountOutputTypeCountAccountLogsArgsObjectSchema as UserCountOutputTypeCountAccountLogsArgsObjectSchema } from './UserCountOutputTypeCountAccountLogsArgs.schema';
import { UserCountOutputTypeCountShiftLogsArgsObjectSchema as UserCountOutputTypeCountShiftLogsArgsObjectSchema } from './UserCountOutputTypeCountShiftLogsArgs.schema';
import { UserCountOutputTypeCountTransactionsArgsObjectSchema as UserCountOutputTypeCountTransactionsArgsObjectSchema } from './UserCountOutputTypeCountTransactionsArgs.schema'

const makeSchema = () => z.object({
  auditLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAuditLogsArgsObjectSchema)]).optional(),
  accountLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAccountLogsArgsObjectSchema)]).optional(),
  shiftLogs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountShiftLogsArgsObjectSchema)]).optional(),
  transactions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTransactionsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();

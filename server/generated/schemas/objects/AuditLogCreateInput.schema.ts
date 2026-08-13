import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema';
import { UserCreateNestedOneWithoutAuditLogsInputObjectSchema as UserCreateNestedOneWithoutAuditLogsInputObjectSchema } from './UserCreateNestedOneWithoutAuditLogsInput.schema'

const makeSchema = () => z.object({
  createdAt: z.coerce.date().optional(),
  actionPerformed: LogActionSchema,
  affectedRecordId: z.number().int(),
  changesDetails: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuditLogsInputObjectSchema)
}).strict();
export const AuditLogCreateInputObjectSchema: z.ZodType<Prisma.AuditLogCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateInput>;
export const AuditLogCreateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumLogActionFilterObjectSchema as EnumLogActionFilterObjectSchema } from './EnumLogActionFilter.schema';
import { LogActionSchema } from '../enums/LogAction.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const auditlogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AuditLogWhereInputObjectSchema), z.lazy(() => AuditLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuditLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuditLogWhereInputObjectSchema), z.lazy(() => AuditLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  actionPerformed: z.union([z.lazy(() => EnumLogActionFilterObjectSchema), LogActionSchema]).optional(),
  affectedRecordId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  changesDetails: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const AuditLogWhereInputObjectSchema: z.ZodType<Prisma.AuditLogWhereInput> = auditlogwhereinputSchema as unknown as z.ZodType<Prisma.AuditLogWhereInput>;
export const AuditLogWhereInputObjectZodSchema = auditlogwhereinputSchema;

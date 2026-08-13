import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumLogActionFilterObjectSchema as EnumLogActionFilterObjectSchema } from './EnumLogActionFilter.schema';
import { LogActionSchema } from '../enums/LogAction.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const auditlogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AuditLogScalarWhereInputObjectSchema), z.lazy(() => AuditLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AuditLogScalarWhereInputObjectSchema), z.lazy(() => AuditLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  actionPerformed: z.union([z.lazy(() => EnumLogActionFilterObjectSchema), LogActionSchema]).optional(),
  affectedRecordId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  changesDetails: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const AuditLogScalarWhereInputObjectSchema: z.ZodType<Prisma.AuditLogScalarWhereInput> = auditlogscalarwhereinputSchema as unknown as z.ZodType<Prisma.AuditLogScalarWhereInput>;
export const AuditLogScalarWhereInputObjectZodSchema = auditlogscalarwhereinputSchema;

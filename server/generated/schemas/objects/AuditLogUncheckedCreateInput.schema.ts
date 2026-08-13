import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  actionPerformed: LogActionSchema,
  affectedRecordId: z.number().int(),
  changesDetails: z.string()
}).strict();
export const AuditLogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AuditLogUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUncheckedCreateInput>;
export const AuditLogUncheckedCreateInputObjectZodSchema = makeSchema();

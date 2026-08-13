import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema'

const makeSchema = () => z.object({
  createdAt: z.coerce.date().optional(),
  actionPerformed: LogActionSchema,
  affectedRecordId: z.number().int(),
  changesDetails: z.string()
}).strict();
export const AuditLogCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogCreateWithoutUserInput>;
export const AuditLogCreateWithoutUserInputObjectZodSchema = makeSchema();

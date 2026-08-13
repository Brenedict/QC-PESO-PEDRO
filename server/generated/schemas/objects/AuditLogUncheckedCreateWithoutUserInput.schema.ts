import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { LogActionSchema } from '../enums/LogAction.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  actionPerformed: LogActionSchema,
  affectedRecordId: z.number().int(),
  changesDetails: z.string()
}).strict();
export const AuditLogUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AuditLogUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogUncheckedCreateWithoutUserInput>;
export const AuditLogUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

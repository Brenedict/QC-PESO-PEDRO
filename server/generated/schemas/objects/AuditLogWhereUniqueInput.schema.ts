import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const AuditLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.AuditLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogWhereUniqueInput>;
export const AuditLogWhereUniqueInputObjectZodSchema = makeSchema();

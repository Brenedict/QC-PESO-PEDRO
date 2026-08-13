import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AuditLogCreateManyInputObjectSchema as AuditLogCreateManyInputObjectSchema } from './objects/AuditLogCreateManyInput.schema';

export const AuditLogCreateManySchema: z.ZodType<Prisma.AuditLogCreateManyArgs> = z.object({ data: z.union([ AuditLogCreateManyInputObjectSchema, z.array(AuditLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogCreateManyArgs>;

export const AuditLogCreateManyZodSchema = z.object({ data: z.union([ AuditLogCreateManyInputObjectSchema, z.array(AuditLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
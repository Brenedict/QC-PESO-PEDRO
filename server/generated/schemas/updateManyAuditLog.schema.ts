import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AuditLogUpdateManyMutationInputObjectSchema as AuditLogUpdateManyMutationInputObjectSchema } from './objects/AuditLogUpdateManyMutationInput.schema';
import { AuditLogWhereInputObjectSchema as AuditLogWhereInputObjectSchema } from './objects/AuditLogWhereInput.schema';

export const AuditLogUpdateManySchema: z.ZodType<Prisma.AuditLogUpdateManyArgs> = z.object({ data: AuditLogUpdateManyMutationInputObjectSchema, where: AuditLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuditLogUpdateManyArgs>;

export const AuditLogUpdateManyZodSchema = z.object({ data: AuditLogUpdateManyMutationInputObjectSchema, where: AuditLogWhereInputObjectSchema.optional() }).strict();
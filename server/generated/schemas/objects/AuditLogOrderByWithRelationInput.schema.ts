import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  actionPerformed: SortOrderSchema.optional(),
  affectedRecordId: SortOrderSchema.optional(),
  changesDetails: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AuditLogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AuditLogOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AuditLogOrderByWithRelationInput>;
export const AuditLogOrderByWithRelationInputObjectZodSchema = makeSchema();

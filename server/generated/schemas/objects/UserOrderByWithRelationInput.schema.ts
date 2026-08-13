import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AuditLogOrderByRelationAggregateInputObjectSchema as AuditLogOrderByRelationAggregateInputObjectSchema } from './AuditLogOrderByRelationAggregateInput.schema';
import { AccountLogOrderByRelationAggregateInputObjectSchema as AccountLogOrderByRelationAggregateInputObjectSchema } from './AccountLogOrderByRelationAggregateInput.schema';
import { ShiftLogOrderByRelationAggregateInputObjectSchema as ShiftLogOrderByRelationAggregateInputObjectSchema } from './ShiftLogOrderByRelationAggregateInput.schema';
import { TransactionOrderByRelationAggregateInputObjectSchema as TransactionOrderByRelationAggregateInputObjectSchema } from './TransactionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  username: SortOrderSchema.optional(),
  password: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  shift: SortOrderSchema.optional(),
  firstName: SortOrderSchema.optional(),
  lastName: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  auditLogs: z.lazy(() => AuditLogOrderByRelationAggregateInputObjectSchema).optional(),
  accountLogs: z.lazy(() => AccountLogOrderByRelationAggregateInputObjectSchema).optional(),
  shiftLogs: z.lazy(() => ShiftLogOrderByRelationAggregateInputObjectSchema).optional(),
  transactions: z.lazy(() => TransactionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();

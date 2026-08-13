import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { TransactionOrderByRelationAggregateInputObjectSchema as TransactionOrderByRelationAggregateInputObjectSchema } from './TransactionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  timeIn: SortOrderSchema.optional(),
  timeOut: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  generalRemarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  adminRemarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastVerifiedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastVerifiedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  environmentTags: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  transactions: z.lazy(() => TransactionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ShiftLogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ShiftLogOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogOrderByWithRelationInput>;
export const ShiftLogOrderByWithRelationInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ShiftLogOrderByWithRelationInputObjectSchema as ShiftLogOrderByWithRelationInputObjectSchema } from './ShiftLogOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  shiftLogId: SortOrderSchema.optional(),
  applicantFirstName: SortOrderSchema.optional(),
  applicantLastName: SortOrderSchema.optional(),
  applicantSex: SortOrderSchema.optional(),
  transactionOutcome: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  transactionType: SortOrderSchema.optional(),
  remarks: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  demographics: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  shiftLog: z.lazy(() => ShiftLogOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const TransactionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionOrderByWithRelationInput>;
export const TransactionOrderByWithRelationInputObjectZodSchema = makeSchema();

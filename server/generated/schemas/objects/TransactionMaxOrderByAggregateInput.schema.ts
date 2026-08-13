import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  remarks: SortOrderSchema.optional()
}).strict();
export const TransactionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TransactionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionMaxOrderByAggregateInput>;
export const TransactionMaxOrderByAggregateInputObjectZodSchema = makeSchema();

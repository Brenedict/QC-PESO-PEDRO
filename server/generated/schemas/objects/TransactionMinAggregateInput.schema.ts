import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  shiftLogId: z.literal(true).optional(),
  applicantFirstName: z.literal(true).optional(),
  applicantLastName: z.literal(true).optional(),
  applicantSex: z.literal(true).optional(),
  transactionOutcome: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  transactionType: z.literal(true).optional(),
  remarks: z.literal(true).optional()
}).strict();
export const TransactionMinAggregateInputObjectSchema: z.ZodType<Prisma.TransactionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TransactionMinAggregateInputType>;
export const TransactionMinAggregateInputObjectZodSchema = makeSchema();

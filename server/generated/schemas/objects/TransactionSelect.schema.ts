import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ShiftLogArgsObjectSchema as ShiftLogArgsObjectSchema } from './ShiftLogArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  userId: z.boolean().optional(),
  shiftLog: z.union([z.boolean(), z.lazy(() => ShiftLogArgsObjectSchema)]).optional(),
  shiftLogId: z.boolean().optional(),
  applicantFirstName: z.boolean().optional(),
  applicantLastName: z.boolean().optional(),
  applicantSex: z.boolean().optional(),
  transactionOutcome: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  transactionType: z.boolean().optional(),
  remarks: z.boolean().optional(),
  demographics: z.boolean().optional()
}).strict();
export const TransactionSelectObjectSchema: z.ZodType<Prisma.TransactionSelect> = makeSchema() as unknown as z.ZodType<Prisma.TransactionSelect>;
export const TransactionSelectObjectZodSchema = makeSchema();

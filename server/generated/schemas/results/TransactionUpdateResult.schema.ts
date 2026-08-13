import * as z from 'zod';
export const TransactionUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  user: z.unknown().optional(),
  userId: z.number().int(),
  shiftLog: z.unknown().optional(),
  shiftLogId: z.number().int(),
  applicantFirstName: z.string(),
  applicantLastName: z.string(),
  applicantSex: z.unknown(),
  transactionOutcome: z.unknown(),
  createdAt: z.date(),
  transactionType: z.unknown(),
  remarks: z.string().nullable().optional(),
  demographics: z.array(z.unknown())
}));
import * as z from 'zod';
export const TransactionFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});
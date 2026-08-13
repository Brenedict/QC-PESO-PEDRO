import * as z from 'zod';
export const TransactionGroupByResultSchema = z.array(z.object({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  shiftLogId: z.number().int().optional(),
  applicantFirstName: z.string().optional(),
  applicantLastName: z.string().optional(),
  applicantSex: z.unknown().optional(),
  transactionOutcome: z.unknown().optional(),
  createdAt: z.date().optional(),
  transactionType: z.unknown().optional(),
  remarks: z.string().nullable().optional(),
  demographics: z.array(z.unknown()).optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    shiftLogId: z.number().optional(),
    applicantFirstName: z.number().optional(),
    applicantLastName: z.number().optional(),
    applicantSex: z.number().optional(),
    transactionOutcome: z.number().optional(),
    createdAt: z.number().optional(),
    transactionType: z.number().optional(),
    remarks: z.number().optional(),
    demographics: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    id: z.number().nullable().optional(),
    userId: z.number().nullable().optional(),
    shiftLogId: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable().optional(),
    userId: z.number().nullable().optional(),
    shiftLogId: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    shiftLogId: z.number().int().nullable().optional(),
    applicantFirstName: z.string().nullable().optional(),
    applicantLastName: z.string().nullable().optional(),
    applicantSex: z.unknown().nullable().optional(),
    transactionOutcome: z.unknown().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    transactionType: z.unknown().nullable().optional(),
    remarks: z.string().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    shiftLogId: z.number().int().nullable().optional(),
    applicantFirstName: z.string().nullable().optional(),
    applicantLastName: z.string().nullable().optional(),
    applicantSex: z.unknown().nullable().optional(),
    transactionOutcome: z.unknown().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    transactionType: z.unknown().nullable().optional(),
    remarks: z.string().nullable().optional()
  }).nullable().optional()
}));
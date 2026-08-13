import * as z from 'zod';
export const ShiftLogFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  user: z.unknown().optional(),
  userId: z.number().int(),
  timeIn: z.date(),
  timeOut: z.date().nullable().optional(),
  status: z.unknown(),
  generalRemarks: z.string().nullable().optional(),
  adminRemarks: z.string().nullable().optional(),
  lastVerifiedBy: z.string().nullable().optional(),
  lastVerifiedAt: z.date().nullable().optional(),
  transactions: z.array(z.unknown()).optional(),
  environmentTags: z.array(z.unknown())
}));
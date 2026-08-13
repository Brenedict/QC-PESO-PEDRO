import * as z from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  role: z.unknown(),
  status: z.unknown(),
  shift: z.unknown(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  auditLogs: z.array(z.unknown()).optional(),
  accountLogs: z.array(z.unknown()).optional(),
  shiftLogs: z.array(z.unknown()).optional(),
  transactions: z.array(z.unknown()).optional()
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
import * as z from 'zod';
export const UserFindFirstResultSchema = z.nullable(z.object({
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
}));
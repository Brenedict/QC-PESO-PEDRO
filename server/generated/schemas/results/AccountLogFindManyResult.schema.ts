import * as z from 'zod';
export const AccountLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  user: z.unknown().optional(),
  userId: z.number().int(),
  logIn: z.date(),
  logOut: z.date().nullable().optional(),
  reason: z.string().nullable().optional(),
  remarks: z.string().nullable().optional()
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
import * as z from 'zod';
export const AccountLogFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  user: z.unknown().optional(),
  userId: z.number().int(),
  logIn: z.date(),
  logOut: z.date().nullable().optional(),
  reason: z.string().nullable().optional(),
  remarks: z.string().nullable().optional()
}));
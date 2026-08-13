import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  logIn: z.coerce.date().optional(),
  logOut: z.coerce.date().optional().nullable(),
  reason: z.string().optional().nullable(),
  remarks: z.string().optional().nullable()
}).strict();
export const AccountLogUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AccountLogUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUncheckedCreateInput>;
export const AccountLogUncheckedCreateInputObjectZodSchema = makeSchema();

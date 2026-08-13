import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  logIn: z.coerce.date().optional(),
  logOut: z.coerce.date().optional().nullable(),
  reason: z.string().optional().nullable(),
  remarks: z.string().optional().nullable()
}).strict();
export const AccountLogUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUncheckedCreateWithoutUserInput>;
export const AccountLogUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

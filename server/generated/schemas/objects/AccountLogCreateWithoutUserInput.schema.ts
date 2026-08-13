import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  logIn: z.coerce.date().optional(),
  logOut: z.coerce.date().optional().nullable(),
  reason: z.string().optional().nullable(),
  remarks: z.string().optional().nullable()
}).strict();
export const AccountLogCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogCreateWithoutUserInput>;
export const AccountLogCreateWithoutUserInputObjectZodSchema = makeSchema();

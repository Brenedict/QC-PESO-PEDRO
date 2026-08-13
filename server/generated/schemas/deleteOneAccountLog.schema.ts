import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './objects/AccountLogSelect.schema';
import { AccountLogIncludeObjectSchema as AccountLogIncludeObjectSchema } from './objects/AccountLogInclude.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './objects/AccountLogWhereUniqueInput.schema';

export const AccountLogDeleteOneSchema: z.ZodType<Prisma.AccountLogDeleteArgs> = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), where: AccountLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AccountLogDeleteArgs>;

export const AccountLogDeleteOneZodSchema = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), where: AccountLogWhereUniqueInputObjectSchema }).strict();
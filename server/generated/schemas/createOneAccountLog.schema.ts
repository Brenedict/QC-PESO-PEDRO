import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './objects/AccountLogSelect.schema';
import { AccountLogIncludeObjectSchema as AccountLogIncludeObjectSchema } from './objects/AccountLogInclude.schema';
import { AccountLogCreateInputObjectSchema as AccountLogCreateInputObjectSchema } from './objects/AccountLogCreateInput.schema';
import { AccountLogUncheckedCreateInputObjectSchema as AccountLogUncheckedCreateInputObjectSchema } from './objects/AccountLogUncheckedCreateInput.schema';

export const AccountLogCreateOneSchema: z.ZodType<Prisma.AccountLogCreateArgs> = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), data: z.union([AccountLogCreateInputObjectSchema, AccountLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AccountLogCreateArgs>;

export const AccountLogCreateOneZodSchema = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), data: z.union([AccountLogCreateInputObjectSchema, AccountLogUncheckedCreateInputObjectSchema]) }).strict();
import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './objects/AccountLogSelect.schema';
import { AccountLogIncludeObjectSchema as AccountLogIncludeObjectSchema } from './objects/AccountLogInclude.schema';
import { AccountLogUpdateInputObjectSchema as AccountLogUpdateInputObjectSchema } from './objects/AccountLogUpdateInput.schema';
import { AccountLogUncheckedUpdateInputObjectSchema as AccountLogUncheckedUpdateInputObjectSchema } from './objects/AccountLogUncheckedUpdateInput.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './objects/AccountLogWhereUniqueInput.schema';

export const AccountLogUpdateOneSchema: z.ZodType<Prisma.AccountLogUpdateArgs> = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), data: z.union([AccountLogUpdateInputObjectSchema, AccountLogUncheckedUpdateInputObjectSchema]), where: AccountLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AccountLogUpdateArgs>;

export const AccountLogUpdateOneZodSchema = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), data: z.union([AccountLogUpdateInputObjectSchema, AccountLogUncheckedUpdateInputObjectSchema]), where: AccountLogWhereUniqueInputObjectSchema }).strict();
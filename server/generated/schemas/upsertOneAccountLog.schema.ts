import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './objects/AccountLogSelect.schema';
import { AccountLogIncludeObjectSchema as AccountLogIncludeObjectSchema } from './objects/AccountLogInclude.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './objects/AccountLogWhereUniqueInput.schema';
import { AccountLogCreateInputObjectSchema as AccountLogCreateInputObjectSchema } from './objects/AccountLogCreateInput.schema';
import { AccountLogUncheckedCreateInputObjectSchema as AccountLogUncheckedCreateInputObjectSchema } from './objects/AccountLogUncheckedCreateInput.schema';
import { AccountLogUpdateInputObjectSchema as AccountLogUpdateInputObjectSchema } from './objects/AccountLogUpdateInput.schema';
import { AccountLogUncheckedUpdateInputObjectSchema as AccountLogUncheckedUpdateInputObjectSchema } from './objects/AccountLogUncheckedUpdateInput.schema';

export const AccountLogUpsertOneSchema: z.ZodType<Prisma.AccountLogUpsertArgs> = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), where: AccountLogWhereUniqueInputObjectSchema, create: z.union([ AccountLogCreateInputObjectSchema, AccountLogUncheckedCreateInputObjectSchema ]), update: z.union([ AccountLogUpdateInputObjectSchema, AccountLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AccountLogUpsertArgs>;

export const AccountLogUpsertOneZodSchema = z.object({ select: AccountLogSelectObjectSchema.optional(), include: AccountLogIncludeObjectSchema.optional(), where: AccountLogWhereUniqueInputObjectSchema, create: z.union([ AccountLogCreateInputObjectSchema, AccountLogUncheckedCreateInputObjectSchema ]), update: z.union([ AccountLogUpdateInputObjectSchema, AccountLogUncheckedUpdateInputObjectSchema ]) }).strict();
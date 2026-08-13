import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './objects/AccountLogSelect.schema';
import { AccountLogUpdateManyMutationInputObjectSchema as AccountLogUpdateManyMutationInputObjectSchema } from './objects/AccountLogUpdateManyMutationInput.schema';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './objects/AccountLogWhereInput.schema';

export const AccountLogUpdateManyAndReturnSchema: z.ZodType<Prisma.AccountLogUpdateManyAndReturnArgs> = z.object({ select: AccountLogSelectObjectSchema.optional(), data: AccountLogUpdateManyMutationInputObjectSchema, where: AccountLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogUpdateManyAndReturnArgs>;

export const AccountLogUpdateManyAndReturnZodSchema = z.object({ select: AccountLogSelectObjectSchema.optional(), data: AccountLogUpdateManyMutationInputObjectSchema, where: AccountLogWhereInputObjectSchema.optional() }).strict();
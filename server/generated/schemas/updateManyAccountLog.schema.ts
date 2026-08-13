import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogUpdateManyMutationInputObjectSchema as AccountLogUpdateManyMutationInputObjectSchema } from './objects/AccountLogUpdateManyMutationInput.schema';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './objects/AccountLogWhereInput.schema';

export const AccountLogUpdateManySchema: z.ZodType<Prisma.AccountLogUpdateManyArgs> = z.object({ data: AccountLogUpdateManyMutationInputObjectSchema, where: AccountLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogUpdateManyArgs>;

export const AccountLogUpdateManyZodSchema = z.object({ data: AccountLogUpdateManyMutationInputObjectSchema, where: AccountLogWhereInputObjectSchema.optional() }).strict();
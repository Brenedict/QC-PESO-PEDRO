import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './objects/AccountLogWhereInput.schema';

export const AccountLogDeleteManySchema: z.ZodType<Prisma.AccountLogDeleteManyArgs> = z.object({ where: AccountLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogDeleteManyArgs>;

export const AccountLogDeleteManyZodSchema = z.object({ where: AccountLogWhereInputObjectSchema.optional() }).strict();
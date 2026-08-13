import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './objects/AccountLogSelect.schema';
import { AccountLogCreateManyInputObjectSchema as AccountLogCreateManyInputObjectSchema } from './objects/AccountLogCreateManyInput.schema';

export const AccountLogCreateManyAndReturnSchema: z.ZodType<Prisma.AccountLogCreateManyAndReturnArgs> = z.object({ select: AccountLogSelectObjectSchema.optional(), data: z.union([ AccountLogCreateManyInputObjectSchema, z.array(AccountLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogCreateManyAndReturnArgs>;

export const AccountLogCreateManyAndReturnZodSchema = z.object({ select: AccountLogSelectObjectSchema.optional(), data: z.union([ AccountLogCreateManyInputObjectSchema, z.array(AccountLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
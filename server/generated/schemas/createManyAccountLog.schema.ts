import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogCreateManyInputObjectSchema as AccountLogCreateManyInputObjectSchema } from './objects/AccountLogCreateManyInput.schema';

export const AccountLogCreateManySchema: z.ZodType<Prisma.AccountLogCreateManyArgs> = z.object({ data: z.union([ AccountLogCreateManyInputObjectSchema, z.array(AccountLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogCreateManyArgs>;

export const AccountLogCreateManyZodSchema = z.object({ data: z.union([ AccountLogCreateManyInputObjectSchema, z.array(AccountLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
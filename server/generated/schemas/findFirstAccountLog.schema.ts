import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { AccountLogIncludeObjectSchema as AccountLogIncludeObjectSchema } from './objects/AccountLogInclude.schema';
import { AccountLogOrderByWithRelationInputObjectSchema as AccountLogOrderByWithRelationInputObjectSchema } from './objects/AccountLogOrderByWithRelationInput.schema';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './objects/AccountLogWhereInput.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './objects/AccountLogWhereUniqueInput.schema';
import { AccountLogScalarFieldEnumSchema } from './enums/AccountLogScalarFieldEnum.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './objects/UserArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AccountLogFindFirstSelectSchema: z.ZodType<Prisma.AccountLogSelect> = z.object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    logIn: z.boolean().optional(),
    logOut: z.boolean().optional(),
    reason: z.boolean().optional(),
    remarks: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AccountLogSelect>;

export const AccountLogFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    logIn: z.boolean().optional(),
    logOut: z.boolean().optional(),
    reason: z.boolean().optional(),
    remarks: z.boolean().optional()
  }).strict();

export const AccountLogFindFirstSchema: z.ZodType<Prisma.AccountLogFindFirstArgs> = z.object({ select: AccountLogFindFirstSelectSchema.optional(), include: z.lazy(() => AccountLogIncludeObjectSchema.optional()), orderBy: z.union([AccountLogOrderByWithRelationInputObjectSchema, AccountLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AccountLogWhereInputObjectSchema.optional(), cursor: AccountLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AccountLogScalarFieldEnumSchema, AccountLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AccountLogFindFirstArgs>;

export const AccountLogFindFirstZodSchema = z.object({ select: AccountLogFindFirstSelectSchema.optional(), include: z.lazy(() => AccountLogIncludeObjectSchema.optional()), orderBy: z.union([AccountLogOrderByWithRelationInputObjectSchema, AccountLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: AccountLogWhereInputObjectSchema.optional(), cursor: AccountLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AccountLogScalarFieldEnumSchema, AccountLogScalarFieldEnumSchema.array()]).optional() }).strict();
import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { UserIncludeObjectSchema as UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';
import { AuditLogFindManySchema } from './findManyAuditLog.schema';
import { AccountLogFindManySchema } from './findManyAccountLog.schema';
import { ShiftLogFindManySchema } from './findManyShiftLog.schema';
import { TransactionFindManySchema } from './findManyTransaction.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './objects/UserCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindManySelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    password: z.boolean().optional(),
    email: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    shift: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    auditLogs: z.union([z.boolean(), z.lazy(() => AuditLogFindManySchema)]).optional(),
    accountLogs: z.union([z.boolean(), z.lazy(() => AccountLogFindManySchema)]).optional(),
    shiftLogs: z.union([z.boolean(), z.lazy(() => ShiftLogFindManySchema)]).optional(),
    transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
  }).strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    password: z.boolean().optional(),
    email: z.boolean().optional(),
    role: z.boolean().optional(),
    status: z.boolean().optional(),
    shift: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    auditLogs: z.union([z.boolean(), z.lazy(() => AuditLogFindManySchema)]).optional(),
    accountLogs: z.union([z.boolean(), z.lazy(() => AccountLogFindManySchema)]).optional(),
    shiftLogs: z.union([z.boolean(), z.lazy(() => ShiftLogFindManySchema)]).optional(),
    transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
  }).strict();

export const UserFindManySchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({ select: UserFindManySelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserFindManyArgs>;

export const UserFindManyZodSchema = z.object({ select: UserFindManySelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict();
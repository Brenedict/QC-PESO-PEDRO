import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './objects/TransactionInclude.schema';
import { TransactionOrderByWithRelationInputObjectSchema as TransactionOrderByWithRelationInputObjectSchema } from './objects/TransactionOrderByWithRelationInput.schema';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './objects/TransactionWhereInput.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './objects/TransactionWhereUniqueInput.schema';
import { TransactionScalarFieldEnumSchema } from './enums/TransactionScalarFieldEnum.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './objects/UserArgs.schema';
import { ShiftLogArgsObjectSchema as ShiftLogArgsObjectSchema } from './objects/ShiftLogArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TransactionFindManySelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    shiftLog: z.union([z.boolean(), z.lazy(() => ShiftLogArgsObjectSchema)]).optional(),
    shiftLogId: z.boolean().optional(),
    applicantFirstName: z.boolean().optional(),
    applicantLastName: z.boolean().optional(),
    applicantSex: z.boolean().optional(),
    transactionOutcome: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    transactionType: z.boolean().optional(),
    remarks: z.boolean().optional(),
    demographics: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TransactionSelect>;

export const TransactionFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    shiftLog: z.union([z.boolean(), z.lazy(() => ShiftLogArgsObjectSchema)]).optional(),
    shiftLogId: z.boolean().optional(),
    applicantFirstName: z.boolean().optional(),
    applicantLastName: z.boolean().optional(),
    applicantSex: z.boolean().optional(),
    transactionOutcome: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    transactionType: z.boolean().optional(),
    remarks: z.boolean().optional(),
    demographics: z.boolean().optional()
  }).strict();

export const TransactionFindManySchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({ select: TransactionFindManySelectSchema.optional(), include: z.lazy(() => TransactionIncludeObjectSchema.optional()), orderBy: z.union([TransactionOrderByWithRelationInputObjectSchema, TransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: TransactionWhereInputObjectSchema.optional(), cursor: TransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TransactionScalarFieldEnumSchema, TransactionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TransactionFindManyArgs>;

export const TransactionFindManyZodSchema = z.object({ select: TransactionFindManySelectSchema.optional(), include: z.lazy(() => TransactionIncludeObjectSchema.optional()), orderBy: z.union([TransactionOrderByWithRelationInputObjectSchema, TransactionOrderByWithRelationInputObjectSchema.array()]).optional(), where: TransactionWhereInputObjectSchema.optional(), cursor: TransactionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TransactionScalarFieldEnumSchema, TransactionScalarFieldEnumSchema.array()]).optional() }).strict();
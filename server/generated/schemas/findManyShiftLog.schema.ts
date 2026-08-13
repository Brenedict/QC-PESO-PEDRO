import type { Prisma } from '../../../shared/prisma/browser';
import * as z from 'zod';
import { ShiftLogIncludeObjectSchema as ShiftLogIncludeObjectSchema } from './objects/ShiftLogInclude.schema';
import { ShiftLogOrderByWithRelationInputObjectSchema as ShiftLogOrderByWithRelationInputObjectSchema } from './objects/ShiftLogOrderByWithRelationInput.schema';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './objects/ShiftLogWhereInput.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './objects/ShiftLogWhereUniqueInput.schema';
import { ShiftLogScalarFieldEnumSchema } from './enums/ShiftLogScalarFieldEnum.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './objects/UserArgs.schema';
import { TransactionFindManySchema } from './findManyTransaction.schema';
import { ShiftLogCountOutputTypeArgsObjectSchema as ShiftLogCountOutputTypeArgsObjectSchema } from './objects/ShiftLogCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ShiftLogFindManySelectSchema: z.ZodType<Prisma.ShiftLogSelect> = z.object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    timeIn: z.boolean().optional(),
    timeOut: z.boolean().optional(),
    status: z.boolean().optional(),
    generalRemarks: z.boolean().optional(),
    adminRemarks: z.boolean().optional(),
    lastVerifiedBy: z.boolean().optional(),
    lastVerifiedAt: z.boolean().optional(),
    transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
    environmentTags: z.boolean().optional(),
    _count: z.union([z.boolean(), z.lazy(() => ShiftLogCountOutputTypeArgsObjectSchema)]).optional()
  }).strict() as unknown as z.ZodType<Prisma.ShiftLogSelect>;

export const ShiftLogFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    userId: z.boolean().optional(),
    timeIn: z.boolean().optional(),
    timeOut: z.boolean().optional(),
    status: z.boolean().optional(),
    generalRemarks: z.boolean().optional(),
    adminRemarks: z.boolean().optional(),
    lastVerifiedBy: z.boolean().optional(),
    lastVerifiedAt: z.boolean().optional(),
    transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
    environmentTags: z.boolean().optional(),
    _count: z.union([z.boolean(), z.lazy(() => ShiftLogCountOutputTypeArgsObjectSchema)]).optional()
  }).strict();

export const ShiftLogFindManySchema: z.ZodType<Prisma.ShiftLogFindManyArgs> = z.object({ select: ShiftLogFindManySelectSchema.optional(), include: z.lazy(() => ShiftLogIncludeObjectSchema.optional()), orderBy: z.union([ShiftLogOrderByWithRelationInputObjectSchema, ShiftLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShiftLogWhereInputObjectSchema.optional(), cursor: ShiftLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ShiftLogScalarFieldEnumSchema, ShiftLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ShiftLogFindManyArgs>;

export const ShiftLogFindManyZodSchema = z.object({ select: ShiftLogFindManySelectSchema.optional(), include: z.lazy(() => ShiftLogIncludeObjectSchema.optional()), orderBy: z.union([ShiftLogOrderByWithRelationInputObjectSchema, ShiftLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShiftLogWhereInputObjectSchema.optional(), cursor: ShiftLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ShiftLogScalarFieldEnumSchema, ShiftLogScalarFieldEnumSchema.array()]).optional() }).strict();
import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { TransactionFindManySchema as TransactionFindManySchema } from '../findManyTransaction.schema';
import { ShiftLogCountOutputTypeArgsObjectSchema as ShiftLogCountOutputTypeArgsObjectSchema } from './ShiftLogCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
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
export const ShiftLogSelectObjectSchema: z.ZodType<Prisma.ShiftLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogSelect>;
export const ShiftLogSelectObjectZodSchema = makeSchema();

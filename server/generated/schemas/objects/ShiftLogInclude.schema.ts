import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { TransactionFindManySchema as TransactionFindManySchema } from '../findManyTransaction.schema';
import { ShiftLogCountOutputTypeArgsObjectSchema as ShiftLogCountOutputTypeArgsObjectSchema } from './ShiftLogCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  transactions: z.union([z.boolean(), z.lazy(() => TransactionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ShiftLogCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ShiftLogIncludeObjectSchema: z.ZodType<Prisma.ShiftLogInclude> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogInclude>;
export const ShiftLogIncludeObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ShiftLogArgsObjectSchema as ShiftLogArgsObjectSchema } from './ShiftLogArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  shiftLog: z.union([z.boolean(), z.lazy(() => ShiftLogArgsObjectSchema)]).optional()
}).strict();
export const TransactionIncludeObjectSchema: z.ZodType<Prisma.TransactionInclude> = makeSchema() as unknown as z.ZodType<Prisma.TransactionInclude>;
export const TransactionIncludeObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  userId: z.boolean().optional(),
  logIn: z.boolean().optional(),
  logOut: z.boolean().optional(),
  reason: z.boolean().optional(),
  remarks: z.boolean().optional()
}).strict();
export const AccountLogSelectObjectSchema: z.ZodType<Prisma.AccountLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogSelect>;
export const AccountLogSelectObjectZodSchema = makeSchema();

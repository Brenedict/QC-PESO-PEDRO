import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const AccountLogIncludeObjectSchema: z.ZodType<Prisma.AccountLogInclude> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogInclude>;
export const AccountLogIncludeObjectZodSchema = makeSchema();

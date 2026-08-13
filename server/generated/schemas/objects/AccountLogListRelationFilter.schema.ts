import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './AccountLogWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AccountLogWhereInputObjectSchema).optional(),
  some: z.lazy(() => AccountLogWhereInputObjectSchema).optional(),
  none: z.lazy(() => AccountLogWhereInputObjectSchema).optional()
}).strict();
export const AccountLogListRelationFilterObjectSchema: z.ZodType<Prisma.AccountLogListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogListRelationFilter>;
export const AccountLogListRelationFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import { AccountLogSelectObjectSchema as AccountLogSelectObjectSchema } from './AccountLogSelect.schema';
import { AccountLogIncludeObjectSchema as AccountLogIncludeObjectSchema } from './AccountLogInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AccountLogSelectObjectSchema).optional(),
  include: z.lazy(() => AccountLogIncludeObjectSchema).optional()
}).strict();
export const AccountLogArgsObjectSchema = makeSchema();
export const AccountLogArgsObjectZodSchema = makeSchema();

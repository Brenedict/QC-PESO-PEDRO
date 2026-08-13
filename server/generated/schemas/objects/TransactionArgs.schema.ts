import * as z from 'zod';
import { TransactionSelectObjectSchema as TransactionSelectObjectSchema } from './TransactionSelect.schema';
import { TransactionIncludeObjectSchema as TransactionIncludeObjectSchema } from './TransactionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TransactionSelectObjectSchema).optional(),
  include: z.lazy(() => TransactionIncludeObjectSchema).optional()
}).strict();
export const TransactionArgsObjectSchema = makeSchema();
export const TransactionArgsObjectZodSchema = makeSchema();

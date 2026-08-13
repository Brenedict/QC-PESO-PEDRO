import * as z from 'zod';
import { ShiftLogSelectObjectSchema as ShiftLogSelectObjectSchema } from './ShiftLogSelect.schema';
import { ShiftLogIncludeObjectSchema as ShiftLogIncludeObjectSchema } from './ShiftLogInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ShiftLogSelectObjectSchema).optional(),
  include: z.lazy(() => ShiftLogIncludeObjectSchema).optional()
}).strict();
export const ShiftLogArgsObjectSchema = makeSchema();
export const ShiftLogArgsObjectZodSchema = makeSchema();

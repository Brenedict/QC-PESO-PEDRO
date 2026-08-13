import * as z from 'zod';
import { ShiftLogCountOutputTypeSelectObjectSchema as ShiftLogCountOutputTypeSelectObjectSchema } from './ShiftLogCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ShiftLogCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ShiftLogCountOutputTypeArgsObjectSchema = makeSchema();
export const ShiftLogCountOutputTypeArgsObjectZodSchema = makeSchema();

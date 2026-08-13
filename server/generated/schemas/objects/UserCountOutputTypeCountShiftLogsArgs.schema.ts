import * as z from 'zod';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './ShiftLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountShiftLogsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountShiftLogsArgsObjectZodSchema = makeSchema();

import * as z from 'zod';
import { AccountLogWhereInputObjectSchema as AccountLogWhereInputObjectSchema } from './AccountLogWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountLogWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAccountLogsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAccountLogsArgsObjectZodSchema = makeSchema();

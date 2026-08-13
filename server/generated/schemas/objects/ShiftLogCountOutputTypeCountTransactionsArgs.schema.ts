import * as z from 'zod';
import { TransactionWhereInputObjectSchema as TransactionWhereInputObjectSchema } from './TransactionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereInputObjectSchema).optional()
}).strict();
export const ShiftLogCountOutputTypeCountTransactionsArgsObjectSchema = makeSchema();
export const ShiftLogCountOutputTypeCountTransactionsArgsObjectZodSchema = makeSchema();

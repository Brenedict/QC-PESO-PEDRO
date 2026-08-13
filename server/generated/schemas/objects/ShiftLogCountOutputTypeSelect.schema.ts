import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogCountOutputTypeCountTransactionsArgsObjectSchema as ShiftLogCountOutputTypeCountTransactionsArgsObjectSchema } from './ShiftLogCountOutputTypeCountTransactionsArgs.schema'

const makeSchema = () => z.object({
  transactions: z.union([z.boolean(), z.lazy(() => ShiftLogCountOutputTypeCountTransactionsArgsObjectSchema)]).optional()
}).strict();
export const ShiftLogCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ShiftLogCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCountOutputTypeSelect>;
export const ShiftLogCountOutputTypeSelectObjectZodSchema = makeSchema();

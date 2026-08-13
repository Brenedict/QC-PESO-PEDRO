import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionCreateManyShiftLogInputObjectSchema as TransactionCreateManyShiftLogInputObjectSchema } from './TransactionCreateManyShiftLogInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TransactionCreateManyShiftLogInputObjectSchema), z.lazy(() => TransactionCreateManyShiftLogInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TransactionCreateManyShiftLogInputEnvelopeObjectSchema: z.ZodType<Prisma.TransactionCreateManyShiftLogInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateManyShiftLogInputEnvelope>;
export const TransactionCreateManyShiftLogInputEnvelopeObjectZodSchema = makeSchema();

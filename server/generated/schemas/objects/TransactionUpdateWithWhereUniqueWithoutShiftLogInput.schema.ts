import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionUpdateWithoutShiftLogInputObjectSchema as TransactionUpdateWithoutShiftLogInputObjectSchema } from './TransactionUpdateWithoutShiftLogInput.schema';
import { TransactionUncheckedUpdateWithoutShiftLogInputObjectSchema as TransactionUncheckedUpdateWithoutShiftLogInputObjectSchema } from './TransactionUncheckedUpdateWithoutShiftLogInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TransactionUpdateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUncheckedUpdateWithoutShiftLogInputObjectSchema)])
}).strict();
export const TransactionUpdateWithWhereUniqueWithoutShiftLogInputObjectSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutShiftLogInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutShiftLogInput>;
export const TransactionUpdateWithWhereUniqueWithoutShiftLogInputObjectZodSchema = makeSchema();

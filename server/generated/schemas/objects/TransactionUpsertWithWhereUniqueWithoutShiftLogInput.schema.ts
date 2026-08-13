import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionUpdateWithoutShiftLogInputObjectSchema as TransactionUpdateWithoutShiftLogInputObjectSchema } from './TransactionUpdateWithoutShiftLogInput.schema';
import { TransactionUncheckedUpdateWithoutShiftLogInputObjectSchema as TransactionUncheckedUpdateWithoutShiftLogInputObjectSchema } from './TransactionUncheckedUpdateWithoutShiftLogInput.schema';
import { TransactionCreateWithoutShiftLogInputObjectSchema as TransactionCreateWithoutShiftLogInputObjectSchema } from './TransactionCreateWithoutShiftLogInput.schema';
import { TransactionUncheckedCreateWithoutShiftLogInputObjectSchema as TransactionUncheckedCreateWithoutShiftLogInputObjectSchema } from './TransactionUncheckedCreateWithoutShiftLogInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TransactionUpdateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUncheckedUpdateWithoutShiftLogInputObjectSchema)]),
  create: z.union([z.lazy(() => TransactionCreateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutShiftLogInputObjectSchema)])
}).strict();
export const TransactionUpsertWithWhereUniqueWithoutShiftLogInputObjectSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutShiftLogInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutShiftLogInput>;
export const TransactionUpsertWithWhereUniqueWithoutShiftLogInputObjectZodSchema = makeSchema();

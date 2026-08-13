import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogUpdateWithoutTransactionsInputObjectSchema as ShiftLogUpdateWithoutTransactionsInputObjectSchema } from './ShiftLogUpdateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedUpdateWithoutTransactionsInput.schema';
import { ShiftLogCreateWithoutTransactionsInputObjectSchema as ShiftLogCreateWithoutTransactionsInputObjectSchema } from './ShiftLogCreateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedCreateWithoutTransactionsInput.schema';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './ShiftLogWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ShiftLogUpdateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ShiftLogCreateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema)]),
  where: z.lazy(() => ShiftLogWhereInputObjectSchema).optional()
}).strict();
export const ShiftLogUpsertWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogUpsertWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpsertWithoutTransactionsInput>;
export const ShiftLogUpsertWithoutTransactionsInputObjectZodSchema = makeSchema();

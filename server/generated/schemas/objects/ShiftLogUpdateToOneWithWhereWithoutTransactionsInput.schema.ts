import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './ShiftLogWhereInput.schema';
import { ShiftLogUpdateWithoutTransactionsInputObjectSchema as ShiftLogUpdateWithoutTransactionsInputObjectSchema } from './ShiftLogUpdateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedUpdateWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ShiftLogUpdateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema)])
}).strict();
export const ShiftLogUpdateToOneWithWhereWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogUpdateToOneWithWhereWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpdateToOneWithWhereWithoutTransactionsInput>;
export const ShiftLogUpdateToOneWithWhereWithoutTransactionsInputObjectZodSchema = makeSchema();

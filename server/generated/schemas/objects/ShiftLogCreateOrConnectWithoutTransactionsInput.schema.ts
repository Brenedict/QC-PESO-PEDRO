import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema';
import { ShiftLogCreateWithoutTransactionsInputObjectSchema as ShiftLogCreateWithoutTransactionsInputObjectSchema } from './ShiftLogCreateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedCreateWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ShiftLogCreateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema)])
}).strict();
export const ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateOrConnectWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateOrConnectWithoutTransactionsInput>;
export const ShiftLogCreateOrConnectWithoutTransactionsInputObjectZodSchema = makeSchema();

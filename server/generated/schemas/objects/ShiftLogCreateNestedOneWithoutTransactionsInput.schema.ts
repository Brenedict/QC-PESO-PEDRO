import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogCreateWithoutTransactionsInputObjectSchema as ShiftLogCreateWithoutTransactionsInputObjectSchema } from './ShiftLogCreateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedCreateWithoutTransactionsInput.schema';
import { ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema as ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema } from './ShiftLogCreateOrConnectWithoutTransactionsInput.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShiftLogCreateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema).optional(),
  connect: z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).optional()
}).strict();
export const ShiftLogCreateNestedOneWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateNestedOneWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateNestedOneWithoutTransactionsInput>;
export const ShiftLogCreateNestedOneWithoutTransactionsInputObjectZodSchema = makeSchema();

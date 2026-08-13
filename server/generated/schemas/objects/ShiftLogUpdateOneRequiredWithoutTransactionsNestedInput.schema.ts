import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogCreateWithoutTransactionsInputObjectSchema as ShiftLogCreateWithoutTransactionsInputObjectSchema } from './ShiftLogCreateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedCreateWithoutTransactionsInput.schema';
import { ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema as ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema } from './ShiftLogCreateOrConnectWithoutTransactionsInput.schema';
import { ShiftLogUpsertWithoutTransactionsInputObjectSchema as ShiftLogUpsertWithoutTransactionsInputObjectSchema } from './ShiftLogUpsertWithoutTransactionsInput.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema';
import { ShiftLogUpdateToOneWithWhereWithoutTransactionsInputObjectSchema as ShiftLogUpdateToOneWithWhereWithoutTransactionsInputObjectSchema } from './ShiftLogUpdateToOneWithWhereWithoutTransactionsInput.schema';
import { ShiftLogUpdateWithoutTransactionsInputObjectSchema as ShiftLogUpdateWithoutTransactionsInputObjectSchema } from './ShiftLogUpdateWithoutTransactionsInput.schema';
import { ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema as ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema } from './ShiftLogUncheckedUpdateWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShiftLogCreateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ShiftLogCreateOrConnectWithoutTransactionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ShiftLogUpsertWithoutTransactionsInputObjectSchema).optional(),
  connect: z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ShiftLogUpdateToOneWithWhereWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUpdateWithoutTransactionsInputObjectSchema), z.lazy(() => ShiftLogUncheckedUpdateWithoutTransactionsInputObjectSchema)]).optional()
}).strict();
export const ShiftLogUpdateOneRequiredWithoutTransactionsNestedInputObjectSchema: z.ZodType<Prisma.ShiftLogUpdateOneRequiredWithoutTransactionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpdateOneRequiredWithoutTransactionsNestedInput>;
export const ShiftLogUpdateOneRequiredWithoutTransactionsNestedInputObjectZodSchema = makeSchema();

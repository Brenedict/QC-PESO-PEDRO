import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema';
import { ShiftLogUpdateWithoutUserInputObjectSchema as ShiftLogUpdateWithoutUserInputObjectSchema } from './ShiftLogUpdateWithoutUserInput.schema';
import { ShiftLogUncheckedUpdateWithoutUserInputObjectSchema as ShiftLogUncheckedUpdateWithoutUserInputObjectSchema } from './ShiftLogUncheckedUpdateWithoutUserInput.schema';
import { ShiftLogCreateWithoutUserInputObjectSchema as ShiftLogCreateWithoutUserInputObjectSchema } from './ShiftLogCreateWithoutUserInput.schema';
import { ShiftLogUncheckedCreateWithoutUserInputObjectSchema as ShiftLogUncheckedCreateWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ShiftLogUpdateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ShiftLogCreateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ShiftLogUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpsertWithWhereUniqueWithoutUserInput>;
export const ShiftLogUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

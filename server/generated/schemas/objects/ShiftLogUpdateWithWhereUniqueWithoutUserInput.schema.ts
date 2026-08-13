import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema';
import { ShiftLogUpdateWithoutUserInputObjectSchema as ShiftLogUpdateWithoutUserInputObjectSchema } from './ShiftLogUpdateWithoutUserInput.schema';
import { ShiftLogUncheckedUpdateWithoutUserInputObjectSchema as ShiftLogUncheckedUpdateWithoutUserInputObjectSchema } from './ShiftLogUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ShiftLogUpdateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ShiftLogUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpdateWithWhereUniqueWithoutUserInput>;
export const ShiftLogUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

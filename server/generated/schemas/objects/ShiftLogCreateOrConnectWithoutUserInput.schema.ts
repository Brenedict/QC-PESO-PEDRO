import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema';
import { ShiftLogCreateWithoutUserInputObjectSchema as ShiftLogCreateWithoutUserInputObjectSchema } from './ShiftLogCreateWithoutUserInput.schema';
import { ShiftLogUncheckedCreateWithoutUserInputObjectSchema as ShiftLogUncheckedCreateWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ShiftLogCreateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ShiftLogCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateOrConnectWithoutUserInput>;
export const ShiftLogCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

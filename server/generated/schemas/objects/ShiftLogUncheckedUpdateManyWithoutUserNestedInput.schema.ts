import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogCreateWithoutUserInputObjectSchema as ShiftLogCreateWithoutUserInputObjectSchema } from './ShiftLogCreateWithoutUserInput.schema';
import { ShiftLogUncheckedCreateWithoutUserInputObjectSchema as ShiftLogUncheckedCreateWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateWithoutUserInput.schema';
import { ShiftLogCreateOrConnectWithoutUserInputObjectSchema as ShiftLogCreateOrConnectWithoutUserInputObjectSchema } from './ShiftLogCreateOrConnectWithoutUserInput.schema';
import { ShiftLogUpsertWithWhereUniqueWithoutUserInputObjectSchema as ShiftLogUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ShiftLogUpsertWithWhereUniqueWithoutUserInput.schema';
import { ShiftLogCreateManyUserInputEnvelopeObjectSchema as ShiftLogCreateManyUserInputEnvelopeObjectSchema } from './ShiftLogCreateManyUserInputEnvelope.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema';
import { ShiftLogUpdateWithWhereUniqueWithoutUserInputObjectSchema as ShiftLogUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ShiftLogUpdateWithWhereUniqueWithoutUserInput.schema';
import { ShiftLogUpdateManyWithWhereWithoutUserInputObjectSchema as ShiftLogUpdateManyWithWhereWithoutUserInputObjectSchema } from './ShiftLogUpdateManyWithWhereWithoutUserInput.schema';
import { ShiftLogScalarWhereInputObjectSchema as ShiftLogScalarWhereInputObjectSchema } from './ShiftLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShiftLogCreateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ShiftLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShiftLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ShiftLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ShiftLogUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ShiftLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ShiftLogWhereUniqueInputObjectSchema), z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ShiftLogWhereUniqueInputObjectSchema), z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ShiftLogWhereUniqueInputObjectSchema), z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ShiftLogWhereUniqueInputObjectSchema), z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ShiftLogUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ShiftLogUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ShiftLogScalarWhereInputObjectSchema), z.lazy(() => ShiftLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ShiftLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ShiftLogUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUncheckedUpdateManyWithoutUserNestedInput>;
export const ShiftLogUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogCreateWithoutUserInputObjectSchema as ShiftLogCreateWithoutUserInputObjectSchema } from './ShiftLogCreateWithoutUserInput.schema';
import { ShiftLogUncheckedCreateWithoutUserInputObjectSchema as ShiftLogUncheckedCreateWithoutUserInputObjectSchema } from './ShiftLogUncheckedCreateWithoutUserInput.schema';
import { ShiftLogCreateOrConnectWithoutUserInputObjectSchema as ShiftLogCreateOrConnectWithoutUserInputObjectSchema } from './ShiftLogCreateOrConnectWithoutUserInput.schema';
import { ShiftLogCreateManyUserInputEnvelopeObjectSchema as ShiftLogCreateManyUserInputEnvelopeObjectSchema } from './ShiftLogCreateManyUserInputEnvelope.schema';
import { ShiftLogWhereUniqueInputObjectSchema as ShiftLogWhereUniqueInputObjectSchema } from './ShiftLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ShiftLogCreateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ShiftLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ShiftLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ShiftLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ShiftLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ShiftLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ShiftLogWhereUniqueInputObjectSchema), z.lazy(() => ShiftLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ShiftLogCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateNestedManyWithoutUserInput>;
export const ShiftLogCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogCreateWithoutUserInputObjectSchema as AccountLogCreateWithoutUserInputObjectSchema } from './AccountLogCreateWithoutUserInput.schema';
import { AccountLogUncheckedCreateWithoutUserInputObjectSchema as AccountLogUncheckedCreateWithoutUserInputObjectSchema } from './AccountLogUncheckedCreateWithoutUserInput.schema';
import { AccountLogCreateOrConnectWithoutUserInputObjectSchema as AccountLogCreateOrConnectWithoutUserInputObjectSchema } from './AccountLogCreateOrConnectWithoutUserInput.schema';
import { AccountLogUpsertWithWhereUniqueWithoutUserInputObjectSchema as AccountLogUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AccountLogUpsertWithWhereUniqueWithoutUserInput.schema';
import { AccountLogCreateManyUserInputEnvelopeObjectSchema as AccountLogCreateManyUserInputEnvelopeObjectSchema } from './AccountLogCreateManyUserInputEnvelope.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './AccountLogWhereUniqueInput.schema';
import { AccountLogUpdateWithWhereUniqueWithoutUserInputObjectSchema as AccountLogUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AccountLogUpdateWithWhereUniqueWithoutUserInput.schema';
import { AccountLogUpdateManyWithWhereWithoutUserInputObjectSchema as AccountLogUpdateManyWithWhereWithoutUserInputObjectSchema } from './AccountLogUpdateManyWithWhereWithoutUserInput.schema';
import { AccountLogScalarWhereInputObjectSchema as AccountLogScalarWhereInputObjectSchema } from './AccountLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AccountLogCreateWithoutUserInputObjectSchema), z.lazy(() => AccountLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AccountLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AccountLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AccountLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountLogUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AccountLogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AccountLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AccountLogWhereUniqueInputObjectSchema), z.lazy(() => AccountLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountLogWhereUniqueInputObjectSchema), z.lazy(() => AccountLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountLogWhereUniqueInputObjectSchema), z.lazy(() => AccountLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountLogWhereUniqueInputObjectSchema), z.lazy(() => AccountLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountLogUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AccountLogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountLogUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AccountLogUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountLogScalarWhereInputObjectSchema), z.lazy(() => AccountLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AccountLogUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AccountLogUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUncheckedUpdateManyWithoutUserNestedInput>;
export const AccountLogUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

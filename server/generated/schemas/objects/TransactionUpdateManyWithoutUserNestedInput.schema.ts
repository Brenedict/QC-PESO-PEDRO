import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionCreateWithoutUserInputObjectSchema as TransactionCreateWithoutUserInputObjectSchema } from './TransactionCreateWithoutUserInput.schema';
import { TransactionUncheckedCreateWithoutUserInputObjectSchema as TransactionUncheckedCreateWithoutUserInputObjectSchema } from './TransactionUncheckedCreateWithoutUserInput.schema';
import { TransactionCreateOrConnectWithoutUserInputObjectSchema as TransactionCreateOrConnectWithoutUserInputObjectSchema } from './TransactionCreateOrConnectWithoutUserInput.schema';
import { TransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema as TransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './TransactionUpsertWithWhereUniqueWithoutUserInput.schema';
import { TransactionCreateManyUserInputEnvelopeObjectSchema as TransactionCreateManyUserInputEnvelopeObjectSchema } from './TransactionCreateManyUserInputEnvelope.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema as TransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './TransactionUpdateWithWhereUniqueWithoutUserInput.schema';
import { TransactionUpdateManyWithWhereWithoutUserInputObjectSchema as TransactionUpdateManyWithWhereWithoutUserInputObjectSchema } from './TransactionUpdateManyWithWhereWithoutUserInput.schema';
import { TransactionScalarWhereInputObjectSchema as TransactionScalarWhereInputObjectSchema } from './TransactionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TransactionCreateWithoutUserInputObjectSchema), z.lazy(() => TransactionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => TransactionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TransactionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => TransactionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => TransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => TransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => TransactionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TransactionScalarWhereInputObjectSchema), z.lazy(() => TransactionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TransactionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdateManyWithoutUserNestedInput>;
export const TransactionUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionCreateWithoutShiftLogInputObjectSchema as TransactionCreateWithoutShiftLogInputObjectSchema } from './TransactionCreateWithoutShiftLogInput.schema';
import { TransactionUncheckedCreateWithoutShiftLogInputObjectSchema as TransactionUncheckedCreateWithoutShiftLogInputObjectSchema } from './TransactionUncheckedCreateWithoutShiftLogInput.schema';
import { TransactionCreateOrConnectWithoutShiftLogInputObjectSchema as TransactionCreateOrConnectWithoutShiftLogInputObjectSchema } from './TransactionCreateOrConnectWithoutShiftLogInput.schema';
import { TransactionUpsertWithWhereUniqueWithoutShiftLogInputObjectSchema as TransactionUpsertWithWhereUniqueWithoutShiftLogInputObjectSchema } from './TransactionUpsertWithWhereUniqueWithoutShiftLogInput.schema';
import { TransactionCreateManyShiftLogInputEnvelopeObjectSchema as TransactionCreateManyShiftLogInputEnvelopeObjectSchema } from './TransactionCreateManyShiftLogInputEnvelope.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionUpdateWithWhereUniqueWithoutShiftLogInputObjectSchema as TransactionUpdateWithWhereUniqueWithoutShiftLogInputObjectSchema } from './TransactionUpdateWithWhereUniqueWithoutShiftLogInput.schema';
import { TransactionUpdateManyWithWhereWithoutShiftLogInputObjectSchema as TransactionUpdateManyWithWhereWithoutShiftLogInputObjectSchema } from './TransactionUpdateManyWithWhereWithoutShiftLogInput.schema';
import { TransactionScalarWhereInputObjectSchema as TransactionScalarWhereInputObjectSchema } from './TransactionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TransactionCreateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionCreateWithoutShiftLogInputObjectSchema).array(), z.lazy(() => TransactionUncheckedCreateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutShiftLogInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TransactionCreateOrConnectWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionCreateOrConnectWithoutShiftLogInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TransactionUpsertWithWhereUniqueWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUpsertWithWhereUniqueWithoutShiftLogInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TransactionCreateManyShiftLogInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TransactionUpdateWithWhereUniqueWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUpdateWithWhereUniqueWithoutShiftLogInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TransactionUpdateManyWithWhereWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUpdateManyWithWhereWithoutShiftLogInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TransactionScalarWhereInputObjectSchema), z.lazy(() => TransactionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TransactionUncheckedUpdateManyWithoutShiftLogNestedInputObjectSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutShiftLogNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutShiftLogNestedInput>;
export const TransactionUncheckedUpdateManyWithoutShiftLogNestedInputObjectZodSchema = makeSchema();

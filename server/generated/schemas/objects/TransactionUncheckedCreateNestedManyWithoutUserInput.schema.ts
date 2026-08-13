import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionCreateWithoutUserInputObjectSchema as TransactionCreateWithoutUserInputObjectSchema } from './TransactionCreateWithoutUserInput.schema';
import { TransactionUncheckedCreateWithoutUserInputObjectSchema as TransactionUncheckedCreateWithoutUserInputObjectSchema } from './TransactionUncheckedCreateWithoutUserInput.schema';
import { TransactionCreateOrConnectWithoutUserInputObjectSchema as TransactionCreateOrConnectWithoutUserInputObjectSchema } from './TransactionCreateOrConnectWithoutUserInput.schema';
import { TransactionCreateManyUserInputEnvelopeObjectSchema as TransactionCreateManyUserInputEnvelopeObjectSchema } from './TransactionCreateManyUserInputEnvelope.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TransactionCreateWithoutUserInputObjectSchema), z.lazy(() => TransactionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => TransactionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TransactionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => TransactionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TransactionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TransactionUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutUserInput>;
export const TransactionUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();

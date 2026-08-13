import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionUpdateWithoutUserInputObjectSchema as TransactionUpdateWithoutUserInputObjectSchema } from './TransactionUpdateWithoutUserInput.schema';
import { TransactionUncheckedUpdateWithoutUserInputObjectSchema as TransactionUncheckedUpdateWithoutUserInputObjectSchema } from './TransactionUncheckedUpdateWithoutUserInput.schema';
import { TransactionCreateWithoutUserInputObjectSchema as TransactionCreateWithoutUserInputObjectSchema } from './TransactionCreateWithoutUserInput.schema';
import { TransactionUncheckedCreateWithoutUserInputObjectSchema as TransactionUncheckedCreateWithoutUserInputObjectSchema } from './TransactionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TransactionUpdateWithoutUserInputObjectSchema), z.lazy(() => TransactionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => TransactionCreateWithoutUserInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const TransactionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutUserInput>;
export const TransactionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

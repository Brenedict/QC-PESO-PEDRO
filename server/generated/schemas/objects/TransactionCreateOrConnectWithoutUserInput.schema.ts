import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionCreateWithoutUserInputObjectSchema as TransactionCreateWithoutUserInputObjectSchema } from './TransactionCreateWithoutUserInput.schema';
import { TransactionUncheckedCreateWithoutUserInputObjectSchema as TransactionUncheckedCreateWithoutUserInputObjectSchema } from './TransactionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TransactionCreateWithoutUserInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const TransactionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateOrConnectWithoutUserInput>;
export const TransactionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

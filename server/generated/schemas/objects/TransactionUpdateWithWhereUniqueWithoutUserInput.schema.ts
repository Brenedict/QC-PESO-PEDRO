import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionUpdateWithoutUserInputObjectSchema as TransactionUpdateWithoutUserInputObjectSchema } from './TransactionUpdateWithoutUserInput.schema';
import { TransactionUncheckedUpdateWithoutUserInputObjectSchema as TransactionUncheckedUpdateWithoutUserInputObjectSchema } from './TransactionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TransactionUpdateWithoutUserInputObjectSchema), z.lazy(() => TransactionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const TransactionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutUserInput>;
export const TransactionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

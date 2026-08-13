import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionScalarWhereInputObjectSchema as TransactionScalarWhereInputObjectSchema } from './TransactionScalarWhereInput.schema';
import { TransactionUpdateManyMutationInputObjectSchema as TransactionUpdateManyMutationInputObjectSchema } from './TransactionUpdateManyMutationInput.schema';
import { TransactionUncheckedUpdateManyWithoutUserInputObjectSchema as TransactionUncheckedUpdateManyWithoutUserInputObjectSchema } from './TransactionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TransactionUpdateManyMutationInputObjectSchema), z.lazy(() => TransactionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const TransactionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutUserInput>;
export const TransactionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();

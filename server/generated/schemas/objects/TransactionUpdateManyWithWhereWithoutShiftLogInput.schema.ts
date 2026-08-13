import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionScalarWhereInputObjectSchema as TransactionScalarWhereInputObjectSchema } from './TransactionScalarWhereInput.schema';
import { TransactionUpdateManyMutationInputObjectSchema as TransactionUpdateManyMutationInputObjectSchema } from './TransactionUpdateManyMutationInput.schema';
import { TransactionUncheckedUpdateManyWithoutShiftLogInputObjectSchema as TransactionUncheckedUpdateManyWithoutShiftLogInputObjectSchema } from './TransactionUncheckedUpdateManyWithoutShiftLogInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TransactionUpdateManyMutationInputObjectSchema), z.lazy(() => TransactionUncheckedUpdateManyWithoutShiftLogInputObjectSchema)])
}).strict();
export const TransactionUpdateManyWithWhereWithoutShiftLogInputObjectSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutShiftLogInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutShiftLogInput>;
export const TransactionUpdateManyWithWhereWithoutShiftLogInputObjectZodSchema = makeSchema();

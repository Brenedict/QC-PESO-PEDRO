import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionCreateWithoutShiftLogInputObjectSchema as TransactionCreateWithoutShiftLogInputObjectSchema } from './TransactionCreateWithoutShiftLogInput.schema';
import { TransactionUncheckedCreateWithoutShiftLogInputObjectSchema as TransactionUncheckedCreateWithoutShiftLogInputObjectSchema } from './TransactionUncheckedCreateWithoutShiftLogInput.schema';
import { TransactionCreateOrConnectWithoutShiftLogInputObjectSchema as TransactionCreateOrConnectWithoutShiftLogInputObjectSchema } from './TransactionCreateOrConnectWithoutShiftLogInput.schema';
import { TransactionCreateManyShiftLogInputEnvelopeObjectSchema as TransactionCreateManyShiftLogInputEnvelopeObjectSchema } from './TransactionCreateManyShiftLogInputEnvelope.schema';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TransactionCreateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionCreateWithoutShiftLogInputObjectSchema).array(), z.lazy(() => TransactionUncheckedCreateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutShiftLogInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TransactionCreateOrConnectWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionCreateOrConnectWithoutShiftLogInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TransactionCreateManyShiftLogInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TransactionWhereUniqueInputObjectSchema), z.lazy(() => TransactionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TransactionCreateNestedManyWithoutShiftLogInputObjectSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutShiftLogInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateNestedManyWithoutShiftLogInput>;
export const TransactionCreateNestedManyWithoutShiftLogInputObjectZodSchema = makeSchema();

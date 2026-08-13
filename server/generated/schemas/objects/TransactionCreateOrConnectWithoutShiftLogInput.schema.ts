import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionWhereUniqueInputObjectSchema as TransactionWhereUniqueInputObjectSchema } from './TransactionWhereUniqueInput.schema';
import { TransactionCreateWithoutShiftLogInputObjectSchema as TransactionCreateWithoutShiftLogInputObjectSchema } from './TransactionCreateWithoutShiftLogInput.schema';
import { TransactionUncheckedCreateWithoutShiftLogInputObjectSchema as TransactionUncheckedCreateWithoutShiftLogInputObjectSchema } from './TransactionUncheckedCreateWithoutShiftLogInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TransactionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TransactionCreateWithoutShiftLogInputObjectSchema), z.lazy(() => TransactionUncheckedCreateWithoutShiftLogInputObjectSchema)])
}).strict();
export const TransactionCreateOrConnectWithoutShiftLogInputObjectSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutShiftLogInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateOrConnectWithoutShiftLogInput>;
export const TransactionCreateOrConnectWithoutShiftLogInputObjectZodSchema = makeSchema();

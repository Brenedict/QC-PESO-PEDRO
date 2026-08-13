import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionTypeSchema } from '../enums/TransactionType.schema'

const makeSchema = () => z.object({
  set: TransactionTypeSchema.optional()
}).strict();
export const EnumTransactionTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumTransactionTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumTransactionTypeFieldUpdateOperationsInput>;
export const EnumTransactionTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();

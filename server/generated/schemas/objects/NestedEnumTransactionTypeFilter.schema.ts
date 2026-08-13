import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionTypeSchema } from '../enums/TransactionType.schema'

const nestedenumtransactiontypefilterSchema = z.object({
  equals: TransactionTypeSchema.optional(),
  in: TransactionTypeSchema.array().optional(),
  notIn: TransactionTypeSchema.array().optional(),
  not: z.union([TransactionTypeSchema, z.lazy(() => NestedEnumTransactionTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumTransactionTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumTransactionTypeFilter> = nestedenumtransactiontypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumTransactionTypeFilter>;
export const NestedEnumTransactionTypeFilterObjectZodSchema = nestedenumtransactiontypefilterSchema;

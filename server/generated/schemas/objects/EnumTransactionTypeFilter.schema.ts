import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { NestedEnumTransactionTypeFilterObjectSchema as NestedEnumTransactionTypeFilterObjectSchema } from './NestedEnumTransactionTypeFilter.schema'

const makeSchema = () => z.object({
  equals: TransactionTypeSchema.optional(),
  in: TransactionTypeSchema.array().optional(),
  notIn: TransactionTypeSchema.array().optional(),
  not: z.union([TransactionTypeSchema, z.lazy(() => NestedEnumTransactionTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumTransactionTypeFilterObjectSchema: z.ZodType<Prisma.EnumTransactionTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTransactionTypeFilter>;
export const EnumTransactionTypeFilterObjectZodSchema = makeSchema();

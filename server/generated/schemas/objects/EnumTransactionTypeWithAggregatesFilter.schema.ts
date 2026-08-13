import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { NestedEnumTransactionTypeWithAggregatesFilterObjectSchema as NestedEnumTransactionTypeWithAggregatesFilterObjectSchema } from './NestedEnumTransactionTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTransactionTypeFilterObjectSchema as NestedEnumTransactionTypeFilterObjectSchema } from './NestedEnumTransactionTypeFilter.schema'

const makeSchema = () => z.object({
  equals: TransactionTypeSchema.optional(),
  in: TransactionTypeSchema.array().optional(),
  notIn: TransactionTypeSchema.array().optional(),
  not: z.union([TransactionTypeSchema, z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterObjectSchema).optional()
}).strict();
export const EnumTransactionTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumTransactionTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumTransactionTypeWithAggregatesFilter>;
export const EnumTransactionTypeWithAggregatesFilterObjectZodSchema = makeSchema();

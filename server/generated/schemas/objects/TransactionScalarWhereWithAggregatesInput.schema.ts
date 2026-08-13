import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumSexWithAggregatesFilterObjectSchema as EnumSexWithAggregatesFilterObjectSchema } from './EnumSexWithAggregatesFilter.schema';
import { SexSchema } from '../enums/Sex.schema';
import { EnumOutcomeWithAggregatesFilterObjectSchema as EnumOutcomeWithAggregatesFilterObjectSchema } from './EnumOutcomeWithAggregatesFilter.schema';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumTransactionTypeWithAggregatesFilterObjectSchema as EnumTransactionTypeWithAggregatesFilterObjectSchema } from './EnumTransactionTypeWithAggregatesFilter.schema';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumDemographicNullableListFilterObjectSchema as EnumDemographicNullableListFilterObjectSchema } from './EnumDemographicNullableListFilter.schema'

const transactionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => TransactionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TransactionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TransactionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TransactionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TransactionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  shiftLogId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  applicantFirstName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"})]).optional(),
  applicantLastName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"})]).optional(),
  applicantSex: z.union([z.lazy(() => EnumSexWithAggregatesFilterObjectSchema), SexSchema]).optional(),
  transactionOutcome: z.union([z.lazy(() => EnumOutcomeWithAggregatesFilterObjectSchema), OutcomeSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  transactionType: z.union([z.lazy(() => EnumTransactionTypeWithAggregatesFilterObjectSchema), TransactionTypeSchema]).optional(),
  remarks: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  demographics: z.lazy(() => EnumDemographicNullableListFilterObjectSchema).optional()
}).strict();
export const TransactionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput> = transactionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput>;
export const TransactionScalarWhereWithAggregatesInputObjectZodSchema = transactionscalarwherewithaggregatesinputSchema;

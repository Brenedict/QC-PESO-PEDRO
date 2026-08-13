import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumSexFilterObjectSchema as EnumSexFilterObjectSchema } from './EnumSexFilter.schema';
import { SexSchema } from '../enums/Sex.schema';
import { EnumOutcomeFilterObjectSchema as EnumOutcomeFilterObjectSchema } from './EnumOutcomeFilter.schema';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumTransactionTypeFilterObjectSchema as EnumTransactionTypeFilterObjectSchema } from './EnumTransactionTypeFilter.schema';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumDemographicNullableListFilterObjectSchema as EnumDemographicNullableListFilterObjectSchema } from './EnumDemographicNullableListFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ShiftLogScalarRelationFilterObjectSchema as ShiftLogScalarRelationFilterObjectSchema } from './ShiftLogScalarRelationFilter.schema';
import { ShiftLogWhereInputObjectSchema as ShiftLogWhereInputObjectSchema } from './ShiftLogWhereInput.schema'

const transactionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TransactionWhereInputObjectSchema), z.lazy(() => TransactionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TransactionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TransactionWhereInputObjectSchema), z.lazy(() => TransactionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  shiftLogId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  applicantFirstName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"})]).optional(),
  applicantLastName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"})]).optional(),
  applicantSex: z.union([z.lazy(() => EnumSexFilterObjectSchema), SexSchema]).optional(),
  transactionOutcome: z.union([z.lazy(() => EnumOutcomeFilterObjectSchema), OutcomeSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  transactionType: z.union([z.lazy(() => EnumTransactionTypeFilterObjectSchema), TransactionTypeSchema]).optional(),
  remarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  demographics: z.lazy(() => EnumDemographicNullableListFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  shiftLog: z.union([z.lazy(() => ShiftLogScalarRelationFilterObjectSchema), z.lazy(() => ShiftLogWhereInputObjectSchema)]).optional()
}).strict();
export const TransactionWhereInputObjectSchema: z.ZodType<Prisma.TransactionWhereInput> = transactionwhereinputSchema as unknown as z.ZodType<Prisma.TransactionWhereInput>;
export const TransactionWhereInputObjectZodSchema = transactionwhereinputSchema;

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumESSStatusFilterObjectSchema as EnumESSStatusFilterObjectSchema } from './EnumESSStatusFilter.schema';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumEnvironmentTagNullableListFilterObjectSchema as EnumEnvironmentTagNullableListFilterObjectSchema } from './EnumEnvironmentTagNullableListFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { TransactionListRelationFilterObjectSchema as TransactionListRelationFilterObjectSchema } from './TransactionListRelationFilter.schema'

const shiftlogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ShiftLogWhereInputObjectSchema), z.lazy(() => ShiftLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShiftLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShiftLogWhereInputObjectSchema), z.lazy(() => ShiftLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  timeIn: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  timeOut: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumESSStatusFilterObjectSchema), ESSStatusSchema]).optional(),
  generalRemarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  adminRemarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastVerifiedBy: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastVerifiedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  environmentTags: z.lazy(() => EnumEnvironmentTagNullableListFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterObjectSchema).optional()
}).strict();
export const ShiftLogWhereInputObjectSchema: z.ZodType<Prisma.ShiftLogWhereInput> = shiftlogwhereinputSchema as unknown as z.ZodType<Prisma.ShiftLogWhereInput>;
export const ShiftLogWhereInputObjectZodSchema = shiftlogwhereinputSchema;

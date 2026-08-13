import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumESSStatusFilterObjectSchema as EnumESSStatusFilterObjectSchema } from './EnumESSStatusFilter.schema';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumEnvironmentTagNullableListFilterObjectSchema as EnumEnvironmentTagNullableListFilterObjectSchema } from './EnumEnvironmentTagNullableListFilter.schema'

const shiftlogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ShiftLogScalarWhereInputObjectSchema), z.lazy(() => ShiftLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShiftLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShiftLogScalarWhereInputObjectSchema), z.lazy(() => ShiftLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  timeIn: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  timeOut: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumESSStatusFilterObjectSchema), ESSStatusSchema]).optional(),
  generalRemarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  adminRemarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastVerifiedBy: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastVerifiedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  environmentTags: z.lazy(() => EnumEnvironmentTagNullableListFilterObjectSchema).optional()
}).strict();
export const ShiftLogScalarWhereInputObjectSchema: z.ZodType<Prisma.ShiftLogScalarWhereInput> = shiftlogscalarwhereinputSchema as unknown as z.ZodType<Prisma.ShiftLogScalarWhereInput>;
export const ShiftLogScalarWhereInputObjectZodSchema = shiftlogscalarwhereinputSchema;

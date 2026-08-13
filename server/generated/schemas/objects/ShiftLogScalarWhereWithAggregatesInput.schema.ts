import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { EnumESSStatusWithAggregatesFilterObjectSchema as EnumESSStatusWithAggregatesFilterObjectSchema } from './EnumESSStatusWithAggregatesFilter.schema';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumEnvironmentTagNullableListFilterObjectSchema as EnumEnvironmentTagNullableListFilterObjectSchema } from './EnumEnvironmentTagNullableListFilter.schema'

const shiftlogscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ShiftLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ShiftLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ShiftLogScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ShiftLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ShiftLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  timeIn: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  timeOut: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumESSStatusWithAggregatesFilterObjectSchema), ESSStatusSchema]).optional(),
  generalRemarks: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  adminRemarks: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  lastVerifiedBy: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  lastVerifiedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  environmentTags: z.lazy(() => EnumEnvironmentTagNullableListFilterObjectSchema).optional()
}).strict();
export const ShiftLogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ShiftLogScalarWhereWithAggregatesInput> = shiftlogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ShiftLogScalarWhereWithAggregatesInput>;
export const ShiftLogScalarWhereWithAggregatesInputObjectZodSchema = shiftlogscalarwherewithaggregatesinputSchema;

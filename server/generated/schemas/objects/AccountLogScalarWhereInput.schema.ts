import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const accountlogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AccountLogScalarWhereInputObjectSchema), z.lazy(() => AccountLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AccountLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountLogScalarWhereInputObjectSchema), z.lazy(() => AccountLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  logIn: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  logOut: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  remarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const AccountLogScalarWhereInputObjectSchema: z.ZodType<Prisma.AccountLogScalarWhereInput> = accountlogscalarwhereinputSchema as unknown as z.ZodType<Prisma.AccountLogScalarWhereInput>;
export const AccountLogScalarWhereInputObjectZodSchema = accountlogscalarwhereinputSchema;

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const accountlogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AccountLogWhereInputObjectSchema), z.lazy(() => AccountLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AccountLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountLogWhereInputObjectSchema), z.lazy(() => AccountLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  logIn: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  logOut: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  remarks: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const AccountLogWhereInputObjectSchema: z.ZodType<Prisma.AccountLogWhereInput> = accountlogwhereinputSchema as unknown as z.ZodType<Prisma.AccountLogWhereInput>;
export const AccountLogWhereInputObjectZodSchema = accountlogwhereinputSchema;

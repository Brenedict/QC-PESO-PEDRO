import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const accountlogscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AccountLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AccountLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AccountLogScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AccountLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  logIn: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  logOut: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  reason: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  remarks: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const AccountLogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AccountLogScalarWhereWithAggregatesInput> = accountlogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AccountLogScalarWhereWithAggregatesInput>;
export const AccountLogScalarWhereWithAggregatesInputObjectZodSchema = accountlogscalarwherewithaggregatesinputSchema;

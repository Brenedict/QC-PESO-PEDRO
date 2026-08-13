import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateNestedOneWithoutAccountLogsInputObjectSchema as UserCreateNestedOneWithoutAccountLogsInputObjectSchema } from './UserCreateNestedOneWithoutAccountLogsInput.schema'

const makeSchema = () => z.object({
  logIn: z.coerce.date().optional(),
  logOut: z.coerce.date().optional().nullable(),
  reason: z.string().optional().nullable(),
  remarks: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountLogsInputObjectSchema)
}).strict();
export const AccountLogCreateInputObjectSchema: z.ZodType<Prisma.AccountLogCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogCreateInput>;
export const AccountLogCreateInputObjectZodSchema = makeSchema();

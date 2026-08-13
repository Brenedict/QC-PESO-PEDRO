import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutTransactionsInputObjectSchema as UserUpdateWithoutTransactionsInputObjectSchema } from './UserUpdateWithoutTransactionsInput.schema';
import { UserUncheckedUpdateWithoutTransactionsInputObjectSchema as UserUncheckedUpdateWithoutTransactionsInputObjectSchema } from './UserUncheckedUpdateWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTransactionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTransactionsInput>;
export const UserUpdateToOneWithWhereWithoutTransactionsInputObjectZodSchema = makeSchema();

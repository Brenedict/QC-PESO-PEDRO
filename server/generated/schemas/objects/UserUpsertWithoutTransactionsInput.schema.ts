import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserUpdateWithoutTransactionsInputObjectSchema as UserUpdateWithoutTransactionsInputObjectSchema } from './UserUpdateWithoutTransactionsInput.schema';
import { UserUncheckedUpdateWithoutTransactionsInputObjectSchema as UserUncheckedUpdateWithoutTransactionsInputObjectSchema } from './UserUncheckedUpdateWithoutTransactionsInput.schema';
import { UserCreateWithoutTransactionsInputObjectSchema as UserCreateWithoutTransactionsInputObjectSchema } from './UserCreateWithoutTransactionsInput.schema';
import { UserUncheckedCreateWithoutTransactionsInputObjectSchema as UserUncheckedCreateWithoutTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutTransactionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTransactionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTransactionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutTransactionsInput>;
export const UserUpsertWithoutTransactionsInputObjectZodSchema = makeSchema();

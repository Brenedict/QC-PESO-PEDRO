import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateWithoutTransactionsInputObjectSchema as UserCreateWithoutTransactionsInputObjectSchema } from './UserCreateWithoutTransactionsInput.schema';
import { UserUncheckedCreateWithoutTransactionsInputObjectSchema as UserUncheckedCreateWithoutTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutTransactionsInput.schema';
import { UserCreateOrConnectWithoutTransactionsInputObjectSchema as UserCreateOrConnectWithoutTransactionsInputObjectSchema } from './UserCreateOrConnectWithoutTransactionsInput.schema';
import { UserUpsertWithoutTransactionsInputObjectSchema as UserUpsertWithoutTransactionsInputObjectSchema } from './UserUpsertWithoutTransactionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutTransactionsInputObjectSchema as UserUpdateToOneWithWhereWithoutTransactionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutTransactionsInput.schema';
import { UserUpdateWithoutTransactionsInputObjectSchema as UserUpdateWithoutTransactionsInputObjectSchema } from './UserUpdateWithoutTransactionsInput.schema';
import { UserUncheckedUpdateWithoutTransactionsInputObjectSchema as UserUncheckedUpdateWithoutTransactionsInputObjectSchema } from './UserUncheckedUpdateWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTransactionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTransactionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTransactionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTransactionsInputObjectSchema), z.lazy(() => UserUpdateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTransactionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutTransactionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutTransactionsNestedInput>;
export const UserUpdateOneRequiredWithoutTransactionsNestedInputObjectZodSchema = makeSchema();

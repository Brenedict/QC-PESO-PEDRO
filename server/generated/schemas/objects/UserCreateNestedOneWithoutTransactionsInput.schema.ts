import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateWithoutTransactionsInputObjectSchema as UserCreateWithoutTransactionsInputObjectSchema } from './UserCreateWithoutTransactionsInput.schema';
import { UserUncheckedCreateWithoutTransactionsInputObjectSchema as UserUncheckedCreateWithoutTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutTransactionsInput.schema';
import { UserCreateOrConnectWithoutTransactionsInputObjectSchema as UserCreateOrConnectWithoutTransactionsInputObjectSchema } from './UserCreateOrConnectWithoutTransactionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTransactionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTransactionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutTransactionsInput>;
export const UserCreateNestedOneWithoutTransactionsInputObjectZodSchema = makeSchema();

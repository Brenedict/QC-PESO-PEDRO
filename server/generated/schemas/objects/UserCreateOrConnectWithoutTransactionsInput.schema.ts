import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutTransactionsInputObjectSchema as UserCreateWithoutTransactionsInputObjectSchema } from './UserCreateWithoutTransactionsInput.schema';
import { UserUncheckedCreateWithoutTransactionsInputObjectSchema as UserUncheckedCreateWithoutTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTransactionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutTransactionsInput>;
export const UserCreateOrConnectWithoutTransactionsInputObjectZodSchema = makeSchema();

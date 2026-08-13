import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserUpdateWithoutAccountLogsInputObjectSchema as UserUpdateWithoutAccountLogsInputObjectSchema } from './UserUpdateWithoutAccountLogsInput.schema';
import { UserUncheckedUpdateWithoutAccountLogsInputObjectSchema as UserUncheckedUpdateWithoutAccountLogsInputObjectSchema } from './UserUncheckedUpdateWithoutAccountLogsInput.schema';
import { UserCreateWithoutAccountLogsInputObjectSchema as UserCreateWithoutAccountLogsInputObjectSchema } from './UserCreateWithoutAccountLogsInput.schema';
import { UserUncheckedCreateWithoutAccountLogsInputObjectSchema as UserUncheckedCreateWithoutAccountLogsInputObjectSchema } from './UserUncheckedCreateWithoutAccountLogsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAccountLogsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAccountLogsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAccountLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAccountLogsInput>;
export const UserUpsertWithoutAccountLogsInputObjectZodSchema = makeSchema();

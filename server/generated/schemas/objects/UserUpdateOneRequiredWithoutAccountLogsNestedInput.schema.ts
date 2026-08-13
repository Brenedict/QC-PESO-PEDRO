import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateWithoutAccountLogsInputObjectSchema as UserCreateWithoutAccountLogsInputObjectSchema } from './UserCreateWithoutAccountLogsInput.schema';
import { UserUncheckedCreateWithoutAccountLogsInputObjectSchema as UserUncheckedCreateWithoutAccountLogsInputObjectSchema } from './UserUncheckedCreateWithoutAccountLogsInput.schema';
import { UserCreateOrConnectWithoutAccountLogsInputObjectSchema as UserCreateOrConnectWithoutAccountLogsInputObjectSchema } from './UserCreateOrConnectWithoutAccountLogsInput.schema';
import { UserUpsertWithoutAccountLogsInputObjectSchema as UserUpsertWithoutAccountLogsInputObjectSchema } from './UserUpsertWithoutAccountLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAccountLogsInputObjectSchema as UserUpdateToOneWithWhereWithoutAccountLogsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAccountLogsInput.schema';
import { UserUpdateWithoutAccountLogsInputObjectSchema as UserUpdateWithoutAccountLogsInputObjectSchema } from './UserUpdateWithoutAccountLogsInput.schema';
import { UserUncheckedUpdateWithoutAccountLogsInputObjectSchema as UserUncheckedUpdateWithoutAccountLogsInputObjectSchema } from './UserUncheckedUpdateWithoutAccountLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAccountLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUpdateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountLogsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAccountLogsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountLogsNestedInput>;
export const UserUpdateOneRequiredWithoutAccountLogsNestedInputObjectZodSchema = makeSchema();

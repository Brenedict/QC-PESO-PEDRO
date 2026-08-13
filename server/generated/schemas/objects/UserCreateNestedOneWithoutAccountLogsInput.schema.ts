import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateWithoutAccountLogsInputObjectSchema as UserCreateWithoutAccountLogsInputObjectSchema } from './UserCreateWithoutAccountLogsInput.schema';
import { UserUncheckedCreateWithoutAccountLogsInputObjectSchema as UserUncheckedCreateWithoutAccountLogsInputObjectSchema } from './UserUncheckedCreateWithoutAccountLogsInput.schema';
import { UserCreateOrConnectWithoutAccountLogsInputObjectSchema as UserCreateOrConnectWithoutAccountLogsInputObjectSchema } from './UserCreateOrConnectWithoutAccountLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAccountLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAccountLogsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAccountLogsInput>;
export const UserCreateNestedOneWithoutAccountLogsInputObjectZodSchema = makeSchema();

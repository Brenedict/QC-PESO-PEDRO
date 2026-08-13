import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAccountLogsInputObjectSchema as UserCreateWithoutAccountLogsInputObjectSchema } from './UserCreateWithoutAccountLogsInput.schema';
import { UserUncheckedCreateWithoutAccountLogsInputObjectSchema as UserUncheckedCreateWithoutAccountLogsInputObjectSchema } from './UserUncheckedCreateWithoutAccountLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAccountLogsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAccountLogsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAccountLogsInput>;
export const UserCreateOrConnectWithoutAccountLogsInputObjectZodSchema = makeSchema();

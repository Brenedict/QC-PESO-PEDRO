import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutShiftLogsInputObjectSchema as UserCreateWithoutShiftLogsInputObjectSchema } from './UserCreateWithoutShiftLogsInput.schema';
import { UserUncheckedCreateWithoutShiftLogsInputObjectSchema as UserUncheckedCreateWithoutShiftLogsInputObjectSchema } from './UserUncheckedCreateWithoutShiftLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutShiftLogsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutShiftLogsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutShiftLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutShiftLogsInput>;
export const UserCreateOrConnectWithoutShiftLogsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateWithoutShiftLogsInputObjectSchema as UserCreateWithoutShiftLogsInputObjectSchema } from './UserCreateWithoutShiftLogsInput.schema';
import { UserUncheckedCreateWithoutShiftLogsInputObjectSchema as UserUncheckedCreateWithoutShiftLogsInputObjectSchema } from './UserUncheckedCreateWithoutShiftLogsInput.schema';
import { UserCreateOrConnectWithoutShiftLogsInputObjectSchema as UserCreateOrConnectWithoutShiftLogsInputObjectSchema } from './UserCreateOrConnectWithoutShiftLogsInput.schema';
import { UserUpsertWithoutShiftLogsInputObjectSchema as UserUpsertWithoutShiftLogsInputObjectSchema } from './UserUpsertWithoutShiftLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutShiftLogsInputObjectSchema as UserUpdateToOneWithWhereWithoutShiftLogsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutShiftLogsInput.schema';
import { UserUpdateWithoutShiftLogsInputObjectSchema as UserUpdateWithoutShiftLogsInputObjectSchema } from './UserUpdateWithoutShiftLogsInput.schema';
import { UserUncheckedUpdateWithoutShiftLogsInputObjectSchema as UserUncheckedUpdateWithoutShiftLogsInputObjectSchema } from './UserUncheckedUpdateWithoutShiftLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutShiftLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutShiftLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutShiftLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUpdateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutShiftLogsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutShiftLogsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutShiftLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutShiftLogsNestedInput>;
export const UserUpdateOneRequiredWithoutShiftLogsNestedInputObjectZodSchema = makeSchema();

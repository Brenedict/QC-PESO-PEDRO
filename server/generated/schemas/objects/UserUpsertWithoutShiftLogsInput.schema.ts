import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserUpdateWithoutShiftLogsInputObjectSchema as UserUpdateWithoutShiftLogsInputObjectSchema } from './UserUpdateWithoutShiftLogsInput.schema';
import { UserUncheckedUpdateWithoutShiftLogsInputObjectSchema as UserUncheckedUpdateWithoutShiftLogsInputObjectSchema } from './UserUncheckedUpdateWithoutShiftLogsInput.schema';
import { UserCreateWithoutShiftLogsInputObjectSchema as UserCreateWithoutShiftLogsInputObjectSchema } from './UserCreateWithoutShiftLogsInput.schema';
import { UserUncheckedCreateWithoutShiftLogsInputObjectSchema as UserUncheckedCreateWithoutShiftLogsInputObjectSchema } from './UserUncheckedCreateWithoutShiftLogsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutShiftLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutShiftLogsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutShiftLogsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutShiftLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutShiftLogsInput>;
export const UserUpsertWithoutShiftLogsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserCreateWithoutShiftLogsInputObjectSchema as UserCreateWithoutShiftLogsInputObjectSchema } from './UserCreateWithoutShiftLogsInput.schema';
import { UserUncheckedCreateWithoutShiftLogsInputObjectSchema as UserUncheckedCreateWithoutShiftLogsInputObjectSchema } from './UserUncheckedCreateWithoutShiftLogsInput.schema';
import { UserCreateOrConnectWithoutShiftLogsInputObjectSchema as UserCreateOrConnectWithoutShiftLogsInputObjectSchema } from './UserCreateOrConnectWithoutShiftLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutShiftLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutShiftLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutShiftLogsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutShiftLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutShiftLogsInput>;
export const UserCreateNestedOneWithoutShiftLogsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutShiftLogsInputObjectSchema as UserUpdateWithoutShiftLogsInputObjectSchema } from './UserUpdateWithoutShiftLogsInput.schema';
import { UserUncheckedUpdateWithoutShiftLogsInputObjectSchema as UserUncheckedUpdateWithoutShiftLogsInputObjectSchema } from './UserUncheckedUpdateWithoutShiftLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutShiftLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutShiftLogsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutShiftLogsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutShiftLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutShiftLogsInput>;
export const UserUpdateToOneWithWhereWithoutShiftLogsInputObjectZodSchema = makeSchema();

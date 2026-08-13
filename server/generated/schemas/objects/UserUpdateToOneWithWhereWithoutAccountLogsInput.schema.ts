import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAccountLogsInputObjectSchema as UserUpdateWithoutAccountLogsInputObjectSchema } from './UserUpdateWithoutAccountLogsInput.schema';
import { UserUncheckedUpdateWithoutAccountLogsInputObjectSchema as UserUncheckedUpdateWithoutAccountLogsInputObjectSchema } from './UserUncheckedUpdateWithoutAccountLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAccountLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountLogsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAccountLogsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountLogsInput>;
export const UserUpdateToOneWithWhereWithoutAccountLogsInputObjectZodSchema = makeSchema();

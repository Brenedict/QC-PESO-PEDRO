import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './AccountLogWhereUniqueInput.schema';
import { AccountLogUpdateWithoutUserInputObjectSchema as AccountLogUpdateWithoutUserInputObjectSchema } from './AccountLogUpdateWithoutUserInput.schema';
import { AccountLogUncheckedUpdateWithoutUserInputObjectSchema as AccountLogUncheckedUpdateWithoutUserInputObjectSchema } from './AccountLogUncheckedUpdateWithoutUserInput.schema';
import { AccountLogCreateWithoutUserInputObjectSchema as AccountLogCreateWithoutUserInputObjectSchema } from './AccountLogCreateWithoutUserInput.schema';
import { AccountLogUncheckedCreateWithoutUserInputObjectSchema as AccountLogUncheckedCreateWithoutUserInputObjectSchema } from './AccountLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AccountLogUpdateWithoutUserInputObjectSchema), z.lazy(() => AccountLogUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AccountLogCreateWithoutUserInputObjectSchema), z.lazy(() => AccountLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AccountLogUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUpsertWithWhereUniqueWithoutUserInput>;
export const AccountLogUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

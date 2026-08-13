import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './AccountLogWhereUniqueInput.schema';
import { AccountLogCreateWithoutUserInputObjectSchema as AccountLogCreateWithoutUserInputObjectSchema } from './AccountLogCreateWithoutUserInput.schema';
import { AccountLogUncheckedCreateWithoutUserInputObjectSchema as AccountLogUncheckedCreateWithoutUserInputObjectSchema } from './AccountLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AccountLogCreateWithoutUserInputObjectSchema), z.lazy(() => AccountLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AccountLogCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogCreateOrConnectWithoutUserInput>;
export const AccountLogCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();

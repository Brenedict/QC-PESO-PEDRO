import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './AccountLogWhereUniqueInput.schema';
import { AccountLogUpdateWithoutUserInputObjectSchema as AccountLogUpdateWithoutUserInputObjectSchema } from './AccountLogUpdateWithoutUserInput.schema';
import { AccountLogUncheckedUpdateWithoutUserInputObjectSchema as AccountLogUncheckedUpdateWithoutUserInputObjectSchema } from './AccountLogUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AccountLogUpdateWithoutUserInputObjectSchema), z.lazy(() => AccountLogUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AccountLogUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUpdateWithWhereUniqueWithoutUserInput>;
export const AccountLogUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();

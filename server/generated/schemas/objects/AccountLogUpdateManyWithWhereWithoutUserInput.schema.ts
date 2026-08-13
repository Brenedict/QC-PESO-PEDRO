import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogScalarWhereInputObjectSchema as AccountLogScalarWhereInputObjectSchema } from './AccountLogScalarWhereInput.schema';
import { AccountLogUpdateManyMutationInputObjectSchema as AccountLogUpdateManyMutationInputObjectSchema } from './AccountLogUpdateManyMutationInput.schema';
import { AccountLogUncheckedUpdateManyWithoutUserInputObjectSchema as AccountLogUncheckedUpdateManyWithoutUserInputObjectSchema } from './AccountLogUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AccountLogUpdateManyMutationInputObjectSchema), z.lazy(() => AccountLogUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AccountLogUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUpdateManyWithWhereWithoutUserInput>;
export const AccountLogUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogCreateWithoutUserInputObjectSchema as AccountLogCreateWithoutUserInputObjectSchema } from './AccountLogCreateWithoutUserInput.schema';
import { AccountLogUncheckedCreateWithoutUserInputObjectSchema as AccountLogUncheckedCreateWithoutUserInputObjectSchema } from './AccountLogUncheckedCreateWithoutUserInput.schema';
import { AccountLogCreateOrConnectWithoutUserInputObjectSchema as AccountLogCreateOrConnectWithoutUserInputObjectSchema } from './AccountLogCreateOrConnectWithoutUserInput.schema';
import { AccountLogCreateManyUserInputEnvelopeObjectSchema as AccountLogCreateManyUserInputEnvelopeObjectSchema } from './AccountLogCreateManyUserInputEnvelope.schema';
import { AccountLogWhereUniqueInputObjectSchema as AccountLogWhereUniqueInputObjectSchema } from './AccountLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AccountLogCreateWithoutUserInputObjectSchema), z.lazy(() => AccountLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AccountLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AccountLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AccountLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AccountLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AccountLogWhereUniqueInputObjectSchema), z.lazy(() => AccountLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AccountLogUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AccountLogUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUncheckedCreateNestedManyWithoutUserInput>;
export const AccountLogUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();

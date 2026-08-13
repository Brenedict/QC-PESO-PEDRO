import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { AccountLogCreateManyUserInputObjectSchema as AccountLogCreateManyUserInputObjectSchema } from './AccountLogCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AccountLogCreateManyUserInputObjectSchema), z.lazy(() => AccountLogCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AccountLogCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AccountLogCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogCreateManyUserInputEnvelope>;
export const AccountLogCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();

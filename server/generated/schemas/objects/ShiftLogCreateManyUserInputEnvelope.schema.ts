import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogCreateManyUserInputObjectSchema as ShiftLogCreateManyUserInputObjectSchema } from './ShiftLogCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ShiftLogCreateManyUserInputObjectSchema), z.lazy(() => ShiftLogCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ShiftLogCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ShiftLogCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateManyUserInputEnvelope>;
export const ShiftLogCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();

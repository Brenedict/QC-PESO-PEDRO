import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { TransactionCreatedemographicsInputObjectSchema as TransactionCreatedemographicsInputObjectSchema } from './TransactionCreatedemographicsInput.schema';
import { DemographicSchema } from '../enums/Demographic.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  shiftLogId: z.number().int(),
  applicantFirstName: z.string(),
  applicantLastName: z.string(),
  applicantSex: SexSchema,
  transactionOutcome: OutcomeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  transactionType: TransactionTypeSchema.optional(),
  remarks: z.string().optional().nullable(),
  demographics: z.union([z.lazy(() => TransactionCreatedemographicsInputObjectSchema), DemographicSchema.array()]).optional()
}).strict();
export const TransactionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUncheckedCreateWithoutUserInput>;
export const TransactionUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

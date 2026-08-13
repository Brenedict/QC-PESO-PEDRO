import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { SexSchema } from '../enums/Sex.schema';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { TransactionCreatedemographicsInputObjectSchema as TransactionCreatedemographicsInputObjectSchema } from './TransactionCreatedemographicsInput.schema';
import { DemographicSchema } from '../enums/Demographic.schema';
import { UserCreateNestedOneWithoutTransactionsInputObjectSchema as UserCreateNestedOneWithoutTransactionsInputObjectSchema } from './UserCreateNestedOneWithoutTransactionsInput.schema';
import { ShiftLogCreateNestedOneWithoutTransactionsInputObjectSchema as ShiftLogCreateNestedOneWithoutTransactionsInputObjectSchema } from './ShiftLogCreateNestedOneWithoutTransactionsInput.schema'

const makeSchema = () => z.object({
  applicantFirstName: z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"}),
  applicantLastName: z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"}),
  applicantSex: SexSchema,
  transactionOutcome: OutcomeSchema.optional(),
  createdAt: z.coerce.date().optional(),
  transactionType: TransactionTypeSchema.optional(),
  remarks: z.string().optional().nullable(),
  demographics: z.union([z.lazy(() => TransactionCreatedemographicsInputObjectSchema), DemographicSchema.array()]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTransactionsInputObjectSchema),
  shiftLog: z.lazy(() => ShiftLogCreateNestedOneWithoutTransactionsInputObjectSchema)
}).strict();
export const TransactionCreateInputObjectSchema: z.ZodType<Prisma.TransactionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionCreateInput>;
export const TransactionCreateInputObjectZodSchema = makeSchema();

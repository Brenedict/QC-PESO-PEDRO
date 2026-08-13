import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { SexSchema } from '../enums/Sex.schema';
import { EnumSexFieldUpdateOperationsInputObjectSchema as EnumSexFieldUpdateOperationsInputObjectSchema } from './EnumSexFieldUpdateOperationsInput.schema';
import { OutcomeSchema } from '../enums/Outcome.schema';
import { EnumOutcomeFieldUpdateOperationsInputObjectSchema as EnumOutcomeFieldUpdateOperationsInputObjectSchema } from './EnumOutcomeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TransactionTypeSchema } from '../enums/TransactionType.schema';
import { EnumTransactionTypeFieldUpdateOperationsInputObjectSchema as EnumTransactionTypeFieldUpdateOperationsInputObjectSchema } from './EnumTransactionTypeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { TransactionUpdatedemographicsInputObjectSchema as TransactionUpdatedemographicsInputObjectSchema } from './TransactionUpdatedemographicsInput.schema';
import { DemographicSchema } from '../enums/Demographic.schema';
import { ShiftLogUpdateOneRequiredWithoutTransactionsNestedInputObjectSchema as ShiftLogUpdateOneRequiredWithoutTransactionsNestedInputObjectSchema } from './ShiftLogUpdateOneRequiredWithoutTransactionsNestedInput.schema'

const makeSchema = () => z.object({
  applicantFirstName: z.union([z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"}), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  applicantLastName: z.union([z.string().max(256).trim().min(1, {message: "Application last name cannot be empty"}), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  applicantSex: z.union([SexSchema, z.lazy(() => EnumSexFieldUpdateOperationsInputObjectSchema)]).optional(),
  transactionOutcome: z.union([OutcomeSchema, z.lazy(() => EnumOutcomeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  transactionType: z.union([TransactionTypeSchema, z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  remarks: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  demographics: z.union([z.lazy(() => TransactionUpdatedemographicsInputObjectSchema), DemographicSchema.array()]).optional(),
  shiftLog: z.lazy(() => ShiftLogUpdateOneRequiredWithoutTransactionsNestedInputObjectSchema).optional()
}).strict();
export const TransactionUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.TransactionUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TransactionUpdateWithoutUserInput>;
export const TransactionUpdateWithoutUserInputObjectZodSchema = makeSchema();

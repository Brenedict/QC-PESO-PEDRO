import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { EnumESSStatusFieldUpdateOperationsInputObjectSchema as EnumESSStatusFieldUpdateOperationsInputObjectSchema } from './EnumESSStatusFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ShiftLogUpdateenvironmentTagsInputObjectSchema as ShiftLogUpdateenvironmentTagsInputObjectSchema } from './ShiftLogUpdateenvironmentTagsInput.schema';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema';
import { TransactionUncheckedUpdateManyWithoutShiftLogNestedInputObjectSchema as TransactionUncheckedUpdateManyWithoutShiftLogNestedInputObjectSchema } from './TransactionUncheckedUpdateManyWithoutShiftLogNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  timeIn: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  timeOut: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([ESSStatusSchema, z.lazy(() => EnumESSStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  generalRemarks: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  adminRemarks: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lastVerifiedBy: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lastVerifiedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  environmentTags: z.union([z.lazy(() => ShiftLogUpdateenvironmentTagsInputObjectSchema), EnvironmentTagSchema.array()]).optional(),
  transactions: z.lazy(() => TransactionUncheckedUpdateManyWithoutShiftLogNestedInputObjectSchema).optional()
}).strict();
export const ShiftLogUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ShiftLogUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUncheckedUpdateInput>;
export const ShiftLogUncheckedUpdateInputObjectZodSchema = makeSchema();

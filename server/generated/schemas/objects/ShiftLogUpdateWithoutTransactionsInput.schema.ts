import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { EnumESSStatusFieldUpdateOperationsInputObjectSchema as EnumESSStatusFieldUpdateOperationsInputObjectSchema } from './EnumESSStatusFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ShiftLogUpdateenvironmentTagsInputObjectSchema as ShiftLogUpdateenvironmentTagsInputObjectSchema } from './ShiftLogUpdateenvironmentTagsInput.schema';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema';
import { UserUpdateOneRequiredWithoutShiftLogsNestedInputObjectSchema as UserUpdateOneRequiredWithoutShiftLogsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutShiftLogsNestedInput.schema'

const makeSchema = () => z.object({
  timeIn: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  timeOut: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([ESSStatusSchema, z.lazy(() => EnumESSStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  generalRemarks: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  adminRemarks: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lastVerifiedBy: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lastVerifiedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  environmentTags: z.union([z.lazy(() => ShiftLogUpdateenvironmentTagsInputObjectSchema), EnvironmentTagSchema.array()]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutShiftLogsNestedInputObjectSchema).optional()
}).strict();
export const ShiftLogUpdateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogUpdateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpdateWithoutTransactionsInput>;
export const ShiftLogUpdateWithoutTransactionsInputObjectZodSchema = makeSchema();

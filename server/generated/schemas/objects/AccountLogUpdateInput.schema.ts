import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutAccountLogsNestedInputObjectSchema as UserUpdateOneRequiredWithoutAccountLogsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAccountLogsNestedInput.schema'

const makeSchema = () => z.object({
  logIn: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  logOut: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  reason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  remarks: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountLogsNestedInputObjectSchema).optional()
}).strict();
export const AccountLogUpdateInputObjectSchema: z.ZodType<Prisma.AccountLogUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountLogUpdateInput>;
export const AccountLogUpdateInputObjectZodSchema = makeSchema();

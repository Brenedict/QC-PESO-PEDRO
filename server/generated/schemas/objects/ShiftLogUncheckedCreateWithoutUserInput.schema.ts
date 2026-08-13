import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { ShiftLogCreateenvironmentTagsInputObjectSchema as ShiftLogCreateenvironmentTagsInputObjectSchema } from './ShiftLogCreateenvironmentTagsInput.schema';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema';
import { TransactionUncheckedCreateNestedManyWithoutShiftLogInputObjectSchema as TransactionUncheckedCreateNestedManyWithoutShiftLogInputObjectSchema } from './TransactionUncheckedCreateNestedManyWithoutShiftLogInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  timeIn: z.coerce.date().optional(),
  timeOut: z.coerce.date().optional().nullable(),
  status: ESSStatusSchema.optional(),
  generalRemarks: z.string().optional().nullable(),
  adminRemarks: z.string().optional().nullable(),
  lastVerifiedBy: z.string().optional().nullable(),
  lastVerifiedAt: z.coerce.date().optional().nullable(),
  environmentTags: z.union([z.lazy(() => ShiftLogCreateenvironmentTagsInputObjectSchema), EnvironmentTagSchema.array()]).optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutShiftLogInputObjectSchema).optional()
}).strict();
export const ShiftLogUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUncheckedCreateWithoutUserInput>;
export const ShiftLogUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();

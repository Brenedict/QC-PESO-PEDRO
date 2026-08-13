import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { ShiftLogCreateenvironmentTagsInputObjectSchema as ShiftLogCreateenvironmentTagsInputObjectSchema } from './ShiftLogCreateenvironmentTagsInput.schema';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema';
import { TransactionCreateNestedManyWithoutShiftLogInputObjectSchema as TransactionCreateNestedManyWithoutShiftLogInputObjectSchema } from './TransactionCreateNestedManyWithoutShiftLogInput.schema'

const makeSchema = () => z.object({
  timeIn: z.coerce.date().optional(),
  timeOut: z.coerce.date().optional().nullable(),
  status: ESSStatusSchema.optional(),
  generalRemarks: z.string().optional().nullable(),
  adminRemarks: z.string().optional().nullable(),
  lastVerifiedBy: z.string().optional().nullable(),
  lastVerifiedAt: z.coerce.date().optional().nullable(),
  environmentTags: z.union([z.lazy(() => ShiftLogCreateenvironmentTagsInputObjectSchema), EnvironmentTagSchema.array()]).optional(),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutShiftLogInputObjectSchema).optional()
}).strict();
export const ShiftLogCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateWithoutUserInput>;
export const ShiftLogCreateWithoutUserInputObjectZodSchema = makeSchema();

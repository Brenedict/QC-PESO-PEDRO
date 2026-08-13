import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { ShiftLogCreateenvironmentTagsInputObjectSchema as ShiftLogCreateenvironmentTagsInputObjectSchema } from './ShiftLogCreateenvironmentTagsInput.schema';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  timeIn: z.coerce.date().optional(),
  timeOut: z.coerce.date().optional().nullable(),
  status: ESSStatusSchema.optional(),
  generalRemarks: z.string().optional().nullable(),
  adminRemarks: z.string().optional().nullable(),
  lastVerifiedBy: z.string().optional().nullable(),
  lastVerifiedAt: z.coerce.date().optional().nullable(),
  environmentTags: z.union([z.lazy(() => ShiftLogCreateenvironmentTagsInputObjectSchema), EnvironmentTagSchema.array()]).optional()
}).strict();
export const ShiftLogUncheckedCreateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogUncheckedCreateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUncheckedCreateWithoutTransactionsInput>;
export const ShiftLogUncheckedCreateWithoutTransactionsInputObjectZodSchema = makeSchema();

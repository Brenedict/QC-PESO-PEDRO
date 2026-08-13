import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ESSStatusSchema } from '../enums/ESSStatus.schema';
import { ShiftLogCreateenvironmentTagsInputObjectSchema as ShiftLogCreateenvironmentTagsInputObjectSchema } from './ShiftLogCreateenvironmentTagsInput.schema';
import { EnvironmentTagSchema } from '../enums/EnvironmentTag.schema';
import { UserCreateNestedOneWithoutShiftLogsInputObjectSchema as UserCreateNestedOneWithoutShiftLogsInputObjectSchema } from './UserCreateNestedOneWithoutShiftLogsInput.schema'

const makeSchema = () => z.object({
  timeIn: z.coerce.date().optional(),
  timeOut: z.coerce.date().optional().nullable(),
  status: ESSStatusSchema.optional(),
  generalRemarks: z.string().optional().nullable(),
  adminRemarks: z.string().optional().nullable(),
  lastVerifiedBy: z.string().optional().nullable(),
  lastVerifiedAt: z.coerce.date().optional().nullable(),
  environmentTags: z.union([z.lazy(() => ShiftLogCreateenvironmentTagsInputObjectSchema), EnvironmentTagSchema.array()]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutShiftLogsInputObjectSchema)
}).strict();
export const ShiftLogCreateWithoutTransactionsInputObjectSchema: z.ZodType<Prisma.ShiftLogCreateWithoutTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogCreateWithoutTransactionsInput>;
export const ShiftLogCreateWithoutTransactionsInputObjectZodSchema = makeSchema();

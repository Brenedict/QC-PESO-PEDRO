import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  timeIn: z.literal(true).optional(),
  timeOut: z.literal(true).optional(),
  status: z.literal(true).optional(),
  generalRemarks: z.literal(true).optional(),
  adminRemarks: z.literal(true).optional(),
  lastVerifiedBy: z.literal(true).optional(),
  lastVerifiedAt: z.literal(true).optional()
}).strict();
export const ShiftLogMinAggregateInputObjectSchema: z.ZodType<Prisma.ShiftLogMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogMinAggregateInputType>;
export const ShiftLogMinAggregateInputObjectZodSchema = makeSchema();

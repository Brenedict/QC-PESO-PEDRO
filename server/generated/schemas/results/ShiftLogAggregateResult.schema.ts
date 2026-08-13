import * as z from 'zod';
export const ShiftLogAggregateResultSchema = z.object({  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    timeIn: z.number().optional(),
    timeOut: z.number().optional(),
    status: z.number().optional(),
    generalRemarks: z.number().optional(),
    adminRemarks: z.number().optional(),
    lastVerifiedBy: z.number().optional(),
    lastVerifiedAt: z.number().optional(),
    environmentTags: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    id: z.number().nullable().optional(),
    userId: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable().optional(),
    userId: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    timeIn: z.date().nullable().optional(),
    timeOut: z.date().nullable().optional(),
    status: z.unknown().nullable().optional(),
    generalRemarks: z.string().nullable().optional(),
    adminRemarks: z.string().nullable().optional(),
    lastVerifiedBy: z.string().nullable().optional(),
    lastVerifiedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    timeIn: z.date().nullable().optional(),
    timeOut: z.date().nullable().optional(),
    status: z.unknown().nullable().optional(),
    generalRemarks: z.string().nullable().optional(),
    adminRemarks: z.string().nullable().optional(),
    lastVerifiedBy: z.string().nullable().optional(),
    lastVerifiedAt: z.date().nullable().optional()
  }).nullable().optional()});
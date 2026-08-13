import * as z from 'zod';
export const AccountLogAggregateResultSchema = z.object({  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    logIn: z.number().optional(),
    logOut: z.number().optional(),
    reason: z.number().optional(),
    remarks: z.number().optional(),
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
    logIn: z.date().nullable().optional(),
    logOut: z.date().nullable().optional(),
    reason: z.string().nullable().optional(),
    remarks: z.string().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    logIn: z.date().nullable().optional(),
    logOut: z.date().nullable().optional(),
    reason: z.string().nullable().optional(),
    remarks: z.string().nullable().optional()
  }).nullable().optional()});
import * as z from 'zod';
export const AuditLogGroupByResultSchema = z.array(z.object({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  createdAt: z.date().optional(),
  actionPerformed: z.unknown().optional(),
  affectedRecordId: z.number().int().optional(),
  changesDetails: z.string().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    createdAt: z.number().optional(),
    actionPerformed: z.number().optional(),
    affectedRecordId: z.number().optional(),
    changesDetails: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    id: z.number().nullable().optional(),
    userId: z.number().nullable().optional(),
    affectedRecordId: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable().optional(),
    userId: z.number().nullable().optional(),
    affectedRecordId: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    actionPerformed: z.unknown().nullable().optional(),
    affectedRecordId: z.number().int().nullable().optional(),
    changesDetails: z.string().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable().optional(),
    userId: z.number().int().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    actionPerformed: z.unknown().nullable().optional(),
    affectedRecordId: z.number().int().nullable().optional(),
    changesDetails: z.string().nullable().optional()
  }).nullable().optional()
}));
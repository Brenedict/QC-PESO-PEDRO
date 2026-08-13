import * as z from 'zod';
export const UserGroupByResultSchema = z.array(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  email: z.string().optional(),
  role: z.unknown().optional(),
  status: z.unknown().optional(),
  shift: z.unknown().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    username: z.number().optional(),
    password: z.number().optional(),
    email: z.number().optional(),
    role: z.number().optional(),
    status: z.number().optional(),
    shift: z.number().optional(),
    firstName: z.number().optional(),
    lastName: z.number().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    id: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable().optional(),
    username: z.string().nullable().optional(),
    password: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    role: z.unknown().nullable().optional(),
    status: z.unknown().nullable().optional(),
    shift: z.unknown().nullable().optional(),
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable().optional(),
    username: z.string().nullable().optional(),
    password: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    role: z.unknown().nullable().optional(),
    status: z.unknown().nullable().optional(),
    shift: z.unknown().nullable().optional(),
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));
import * as z from 'zod';

export const RoleSchema = z.enum(['SUPERADMIN', 'ADMIN', 'FRONTLINE'])

export type Role = z.infer<typeof RoleSchema>;
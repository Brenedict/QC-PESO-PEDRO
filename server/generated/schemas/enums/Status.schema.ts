import * as z from 'zod';

export const StatusSchema = z.enum(['ONLINE', 'OFFLINE', 'LOGGED_OUT'])

export type Status = z.infer<typeof StatusSchema>;
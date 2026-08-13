import * as z from 'zod';

export const ESSStatusSchema = z.enum(['PENDING', 'REJECTED', 'REVISION', 'APPROVED'])

export type ESSStatus = z.infer<typeof ESSStatusSchema>;
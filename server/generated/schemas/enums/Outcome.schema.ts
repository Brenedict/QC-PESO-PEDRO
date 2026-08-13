import * as z from 'zod';

export const OutcomeSchema = z.enum(['PENDING', 'MISMATCH', 'SUCCESS', 'NONE'])

export type Outcome = z.infer<typeof OutcomeSchema>;
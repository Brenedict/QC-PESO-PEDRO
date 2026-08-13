import * as z from 'zod';

export const ShiftSchema = z.enum(['MORNING', 'AFTERNOON'])

export type Shift = z.infer<typeof ShiftSchema>;
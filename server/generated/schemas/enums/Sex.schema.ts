import * as z from 'zod';

export const SexSchema = z.enum(['MALE', 'FEMALE'])

export type Sex = z.infer<typeof SexSchema>;
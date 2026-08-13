import * as z from 'zod';

export const EnvironmentTagSchema = z.enum(['SLOW_INTERNET', 'HEAVY_RAIN', 'BROKEN_EQUIPMENT', 'APPLICANT_ISSUES', 'FEELING_UNWELL', 'BROKEN_SOFTWARE_SYSTEM'])

export type EnvironmentTag = z.infer<typeof EnvironmentTagSchema>;
import * as z from 'zod';

export const DemographicSchema = z.enum(['FIRST_TIME_JOB_SEEKER', 'PERSONS_WITH_DISABILITY', 'SENIOR_CITIZEN', 'YOUNG_WORKER', 'WORK_IMMERSION_INTERNSHIP'])

export type Demographic = z.infer<typeof DemographicSchema>;
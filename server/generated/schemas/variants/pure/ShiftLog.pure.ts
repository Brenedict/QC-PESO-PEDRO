import * as z from 'zod';
import { ESSStatusSchema } from '../../enums/ESSStatus.schema';
import { EnvironmentTagSchema } from '../../enums/EnvironmentTag.schema';
// prettier-ignore
export const ShiftLogModelSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    timeIn: z.date(),
    timeOut: z.date().nullable(),
    status: ESSStatusSchema,
    generalRemarks: z.string().nullable(),
    adminRemarks: z.string().nullable(),
    lastVerifiedBy: z.string().nullable(),
    lastVerifiedAt: z.date().nullable(),
    transactions: z.array(z.unknown()),
    environmentTags: EnvironmentTagSchema.array()
}).strict();

export type ShiftLogPureType = z.infer<typeof ShiftLogModelSchema>;

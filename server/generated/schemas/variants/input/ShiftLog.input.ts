import * as z from 'zod';
import { ESSStatusSchema } from '../../enums/ESSStatus.schema';
import { EnvironmentTagSchema } from '../../enums/EnvironmentTag.schema';
// prettier-ignore
export const ShiftLogInputSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    timeIn: z.coerce.date(),
    timeOut: z.coerce.date().optional().nullable(),
    status: ESSStatusSchema,
    generalRemarks: z.string().optional().nullable(),
    adminRemarks: z.string().optional().nullable(),
    lastVerifiedBy: z.string().optional().nullable(),
    lastVerifiedAt: z.coerce.date().optional().nullable(),
    transactions: z.array(z.unknown()),
    environmentTags: EnvironmentTagSchema.array()
}).strict();

export type ShiftLogInputType = z.infer<typeof ShiftLogInputSchema>;

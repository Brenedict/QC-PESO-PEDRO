import * as z from 'zod';
import { SexSchema } from '../../enums/Sex.schema';
import { OutcomeSchema } from '../../enums/Outcome.schema';
import { TransactionTypeSchema } from '../../enums/TransactionType.schema';
import { DemographicSchema } from '../../enums/Demographic.schema';
// prettier-ignore
export const TransactionInputSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    shiftLog: z.unknown(),
    shiftLogId: z.number().int(),
    applicantFirstName: z.string().trim().min(1, {message: "Application last name cannot be empty"}),
    applicantLastName: z.string().trim().min(1, {message: "Application last name cannot be empty"}),
    applicantSex: SexSchema,
    transactionOutcome: OutcomeSchema,
    createdAt: z.coerce.date(),
    transactionType: TransactionTypeSchema,
    remarks: z.string().optional().nullable(),
    demographics: DemographicSchema.array()
}).strict();

export type TransactionInputType = z.infer<typeof TransactionInputSchema>;

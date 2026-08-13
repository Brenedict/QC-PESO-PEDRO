import * as z from 'zod';

export const TransactionScalarFieldEnumSchema = z.enum(['id', 'userId', 'shiftLogId', 'applicantFirstName', 'applicantLastName', 'applicantSex', 'transactionOutcome', 'createdAt', 'transactionType', 'remarks', 'demographics'])

export type TransactionScalarFieldEnum = z.infer<typeof TransactionScalarFieldEnumSchema>;
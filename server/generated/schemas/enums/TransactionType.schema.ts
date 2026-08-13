import * as z from 'zod';

export const TransactionTypeSchema = z.enum(['WALK_IN_REFERRAL', 'ONLINE_REFERRAL', 'IN_HOUSE_RECRUITMENT'])

export type TransactionType = z.infer<typeof TransactionTypeSchema>;
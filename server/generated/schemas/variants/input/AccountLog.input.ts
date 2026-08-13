import * as z from 'zod';
// prettier-ignore
export const AccountLogInputSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    logIn: z.coerce.date(),
    logOut: z.coerce.date().optional().nullable(),
    reason: z.string().optional().nullable(),
    remarks: z.string().optional().nullable()
}).strict();

export type AccountLogInputType = z.infer<typeof AccountLogInputSchema>;

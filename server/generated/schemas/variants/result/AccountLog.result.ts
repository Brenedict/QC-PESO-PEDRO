import * as z from 'zod';
// prettier-ignore
export const AccountLogResultSchema = z.object({
    id: z.number().int(),
    user: z.unknown(),
    userId: z.number().int(),
    logIn: z.date(),
    logOut: z.date().nullable(),
    reason: z.string().nullable(),
    remarks: z.string().nullable()
}).strict();

export type AccountLogResultType = z.infer<typeof AccountLogResultSchema>;

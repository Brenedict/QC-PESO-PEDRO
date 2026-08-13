import * as z from 'zod';

export const AccountLogScalarFieldEnumSchema = z.enum(['id', 'userId', 'logIn', 'logOut', 'reason', 'remarks'])

export type AccountLogScalarFieldEnum = z.infer<typeof AccountLogScalarFieldEnumSchema>;
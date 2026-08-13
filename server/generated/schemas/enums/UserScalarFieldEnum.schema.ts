import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'username', 'password', 'email', 'role', 'status', 'shift', 'firstName', 'lastName', 'createdAt', 'updatedAt'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;
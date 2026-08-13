import * as z from 'zod';

export const AuditLogScalarFieldEnumSchema = z.enum(['id', 'userId', 'createdAt', 'actionPerformed', 'affectedRecordId', 'changesDetails'])

export type AuditLogScalarFieldEnum = z.infer<typeof AuditLogScalarFieldEnumSchema>;
import * as z from 'zod';

export const ShiftLogScalarFieldEnumSchema = z.enum(['id', 'userId', 'timeIn', 'timeOut', 'status', 'generalRemarks', 'adminRemarks', 'lastVerifiedBy', 'lastVerifiedAt', 'environmentTags'])

export type ShiftLogScalarFieldEnum = z.infer<typeof ShiftLogScalarFieldEnumSchema>;
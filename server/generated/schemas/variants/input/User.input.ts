import * as z from 'zod';
import { RoleSchema } from '../../enums/Role.schema';
import { StatusSchema } from '../../enums/Status.schema';
import { ShiftSchema } from '../../enums/Shift.schema';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.number().int(),
    username: z.string(),
    password: z.string(),
    email: z.string(),
    role: RoleSchema,
    status: StatusSchema,
    shift: ShiftSchema,
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    auditLogs: z.array(z.unknown()),
    accountLogs: z.array(z.unknown()),
    shiftLogs: z.array(z.unknown()),
    transactions: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;

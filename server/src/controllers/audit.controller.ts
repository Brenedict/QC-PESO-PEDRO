// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import {
    UserFormCreateSchema,
    UserFormUpdateSchema,
    UserQuerySchema,
    type UserQueryType,
    UserFormChangePasswordSchema,
} from "@qcpesopedro/shared/schema/users";
import { LogAction, type Role, type Status, type User } from "@qcpesopedro/shared/prisma/browser";
import { AccessLevel } from "@qcpesopedro/shared/enums";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";
import { type AuditLogsResponseType } from "@qcpesopedro/shared/schema/audit";
// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";

// Services
import AuditService from "../service/audit.service";

export default {
    getAudits: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        async (req: Request, res: Response) => {
            const total = await AuditService.getTotalAuditLogCount();
            const logs: AuditLogsResponseType = await AuditService.getAuditLogs(null);

            return res.status(200).json(logs);
        },
    ],
};

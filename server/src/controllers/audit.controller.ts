// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import {
    AuditLogQuerySchema,
    type AuditLogQueryType,
    type AuditLogsResponseType,
} from "@qcpesopedro/shared/schema/audit";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
import { requireAccessLevel } from "../middlewares/authorized.middleware";

// Services
import AuditService from "../service/audit.service";
import { validateSchema } from "../middlewares/zod.middleware";
import type { AuditLogWhereInput } from "@qcpesopedro/shared/prisma/models";

export default {
    getAudits: [
        jwtAccessAuth,
        requireAccessLevel(AccessLevel.ADMIN),
        validateSchema("query", AuditLogQuerySchema),
        async (req: Request, res: Response) => {
            const total = await AuditService.getTotalAuditLogCount();

            const logs: AuditLogsResponseType = await AuditService.getAuditLogs(
                req.query as unknown as AuditLogQueryType
            );

            return res.status(200).json(logs);
        },
    ],
};

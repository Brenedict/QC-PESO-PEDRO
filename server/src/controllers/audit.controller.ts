// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS

import { AccessLevel } from "@qcpesopedro/shared/enums";
import { type AuditLogsResponseType } from "@qcpesopedro/shared/schema/audit";

// Middlewares
import { jwtAccessAuth } from "../middlewares/passport.middleware";
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

// General Imports
import type { LogAction } from "@qcpesopedro/shared/prisma/enums";

import { type LogMetaData } from "../service/audit.service";
import type { Request, Response, NextFunction } from "express";

import AuditService from "../service/audit.service";

export async function auditLog(req: Request, res: Response, next: NextFunction) {
    res.on("finish", async () => {
        const metadata: LogMetaData = res.locals.auditMetadata;

        // Only finalizes audit log on successful status codes
        if (res.statusCode >= 200 && res.statusCode < 300 && metadata) {
            // Middleware handles final creation of audit log
            await AuditService.formatAuditLog(metadata);
        }
    });

    next();
}

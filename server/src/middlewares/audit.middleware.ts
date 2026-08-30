// General Imports
import type { LogAction } from "@qcpesopedro/shared/prisma/enums";

import { type LogMetaData } from "../models/audit.model";
import type { Request, Response, NextFunction } from "express";

import AuditService from "../service/audit.service";

export function createAuditLog(action: LogAction) {
    return async (req: Request, res: Response, next: NextFunction) => {
        res.on("finish", async () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const metadata: LogMetaData = res.locals.auditMetadata;

                await AuditService.createFormattedAuditLog(metadata, action);
            }
        });

        next();
    };
}

// General Imports
import type { LogAction } from "@qcpesopedro/shared/prisma/enums";
import type { Request, Response, NextFunction } from "express";

export async function createAuditLog(action: LogAction) {
    (req: Request, res: Response, next: NextFunction) => {
        res.on("finish", () => {});

        next();
    };
}

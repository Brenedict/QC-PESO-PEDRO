import type { Request, Response, NextFunction } from "express";
import { AccessLevel, ROLE_TO_LEVEL } from "@qcpesopedro/shared/prisma/accessLevel";
import type { User } from "@qcpesopedro/shared/prisma/browser";

export function requireAccessLevel(minAccessLevel: AccessLevel) {
    return (req: Request, res: Response, next: NextFunction) => {
        const requestor = req.user as User;

        const userLevel = ROLE_TO_LEVEL[requestor.role] ?? 0;

        if (userLevel < minAccessLevel) {
            return res.status(403).json({ message: "Insufficient access level" });
        }

        next();
    };
}

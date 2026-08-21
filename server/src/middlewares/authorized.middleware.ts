// General Imports
import type { Request, Response, NextFunction } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";
import type { User } from "@qcpesopedro/shared/prisma/browser";

export function requireAccessLevel(minAccessLevel: AccessLevel) {
    return (req: Request, res: Response, next: NextFunction) => {
        const requestor = req.user as User;

        const userLevel = AccessLevel[requestor.role] ?? 0;

        if (userLevel < minAccessLevel) {
            return res.status(403).json({ message: "Insufficient access level" });
        }

        next();
    };
}

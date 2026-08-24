// General Imports
import type { Request, Response, NextFunction } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/accessLevel";
import type { User } from "@qcpesopedro/shared/prisma/browser";
import UserService from "../service/user.service";
import ShiftService from "../service/shift.service";

export function requireAccessLevel(minAccessLevel: AccessLevel) {
    return (req: Request, res: Response, next: NextFunction) => {
        const requestor = req.user as User | undefined;

        if (!requestor) {
            return res.status(404).json({ message: "User not found" });
        }

        const userLevel = AccessLevel[requestor.role] ?? 0;

        if (userLevel < minAccessLevel) {
            return res.status(403).json({ message: "Insufficient access level" });
        }

        next();
    };
}

export async function verifyShift(req: Request, res: Response, next: NextFunction) {
    const requestor = req.user as User | undefined;

    if (!requestor) {
        return res.status(404).json({ message: "User not found" });
    }

    // 1️⃣Finished  shift today?
    const finishedShift = await UserService.hasFinishedShiftToday(requestor.id);
    if (finishedShift) {
        return res.status(409).json({ message: "User has already finished shift this day" });
    }

    // Has unfinished shift last time?
    const unfinishedShift = await UserService.getMostRecentUnfinishedShift(requestor.id);
    if (unfinishedShift && !ShiftService.isTodayShift(unfinishedShift)) {
        return res.status(422).json({
            message: "Please resolve unfinished shift it before starting a new one.",
        });
    }

    next();
}

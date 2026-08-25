// General Imports
import type { Request, Response, NextFunction } from "express";

// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import type { User } from "@qcpesopedro/shared/prisma/browser";
import UserService from "../service/user.service";
import { ShiftStatus } from "@qcpesopedro/shared/enums";

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

// TODO: Add at login?
export async function verifyFinishedShift(req: Request, res: Response, next: NextFunction) {
    const requestor = req.user as User | undefined;

    if (!requestor) {
        return res.status(404).json({ message: "User not found" });
    }

    // Finished  shift today?
    const finishedShift = await UserService.hasFinishedShiftToday(requestor.id);
    if (finishedShift) {
        return res.status(409).json({ message: "User has already finished shift this day" });
    }

    next();
}

// TODO: Add at dashboard? Show that user has needs to time in or resolve unfinished shift
export async function requireTimeIn(req: Request, res: Response, next: NextFunction) {
    const requestor = req.user as User | undefined;

    if (!requestor) {
        return res.status(404).json({ message: "User not found" });
    }

    // Require time-in if they dont have shift yet
    const unfinishedShift = await UserService.getMostRecentUnfinishedShift(requestor.id);
    if (!unfinishedShift) {
        return res.status(409).json({
            shiftStatus: ShiftStatus.TIMEIN, // Need time in
            message: "Please create another time in",
        });
    }

    // Has unfinished shift last time?
    // if (unfinishedShift && !ShiftService.isTodayShift(unfinishedShift)) {
    //     return res.status(409).json({
    //         shiftStatus: ShiftStatus.UNFINISHED,
    //         message: "Please resolve unfinished shift it before starting a new one.",
    //     });
    // }
    //
    next();
}

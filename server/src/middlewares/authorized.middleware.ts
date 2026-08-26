// General Imports
import type { Request, Response, NextFunction } from "express";
// PEDRO SHARED IMPORTS
import { AccessLevel } from "@qcpesopedro/shared/enums";
import type { User } from "@qcpesopedro/shared/prisma/browser";
import UserService from "../service/user.service";
import { ShiftStatus } from "@qcpesopedro/shared/enums";
import ShiftService from "../service/shift.service";

// Models
import UserModel from "../models/user.model";

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

export async function requireUnfinishedShift(req: Request, res: Response, next: NextFunction) {
    const requestor = req.user as User | undefined;

    if (!requestor) {
        return res.status(404).json({ message: "User not found" });
    }

    const unfinishedShift = await UserService.getMostRecentUnfinishedShift(requestor.id);

    //Has unfinished shift last time?
    if (unfinishedShift && !ShiftService.isTodayShift(unfinishedShift)) {
        return res.status(409).json({
            shiftStatus: ShiftStatus.UNFINISHED,
            message: "Please resolve unfinished shift  before starting a new one.",
        });
    }

    // Require time-in if they dont have shift yet
    if (!unfinishedShift) {
        return res.status(409).json({
            shiftStatus: ShiftStatus.TIMEIN, // Need time in
            message: "Please create another time in",
        });
    }

    next();
}

export async function requireValidResetToken(req: Request, res: Response, next: NextFunction) {
    try {
        const rawToken = req.query.token;

        if (!rawToken || typeof rawToken !== "string") {
            return res.status(400).json({ message: "Invalid or missing reset link." });
        }

        const requestor = (await UserModel.getByResetToken(rawToken)) as User | null;

        if (!requestor) {
            return res.status(401).json({ message: "Invalid link." });
        }

        const currentTimestampTz = new Date();

        if (requestor.resetTokenExpiresAt && currentTimestampTz >= requestor.resetTokenExpiresAt) {
            // Clears Reset Token to prevent stale data
            const clearedUser = {
                resetToken: null,
                resetTokenExpiresAt: null,
            } as User;

            await UserModel.updateUser(requestor.id, clearedUser);

            return res.status(401).json({ message: "Expired link." });
        }

        req.user = requestor;

        return next();
    } catch (error) {
        console.error("Error verifying reset token:", error);
        return res.status(500).json({ message: "Internal server error during token validation." });
    }
}

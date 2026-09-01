// General Imports
import passport from "passport";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// PEDRO SHARED IMPORTS
import { Status, type User } from "@qcpesopedro/shared/prisma/client";

// Service
import LogService from "../service/log.service";

type PPError = Error | null;
type PPUser = User | false;
type PPInfo = { message: string } | null;

export const localAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", { session: false }, (err: PPError, user: PPUser, info: PPInfo) => {
        try {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }

            if (!user) {
                const fallbackMessage = "Invalid email or password";
                return res.status(401).json({ message: info?.message || fallbackMessage });
            }

            req.user = user;
            return next();
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};

const jwtAuth = (type: "access" | "refresh") => (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(`jwt-${type}`, { session: false }, async (err: PPError, user: PPUser) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        if (!user) {
            if (type === "refresh") {
                await LogService.closeOpenLogOnExpiredRefresh(req);
            }
            return res.status(401).json({ error: "User is unauthorized" });
        }

        if (user.status == Status.DISABLED) {
            return res.status(401).json({ error: "User account is disabled" });
        }

        req.user = user;
        return next();
    })(req, res, next);
};

export const jwtAccessAuth = jwtAuth("access");
export const jwtRefreshAuth = jwtAuth("refresh");

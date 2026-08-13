import passport from "passport";
import type { Request, Response, NextFunction } from "express";
import type { User } from "@qcpesopedro/shared/prisma/client";

type PPError = Error | null;
type PPUser = User | false;
type PPInfo = { message: string } | null;

export const localAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", { session: false }, (err: PPError, user: PPUser, info: PPInfo) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        if (!user) {
            const fallbackMessage = "Invalid email or password";
            return res.status(401).json({ error: info?.message || fallbackMessage });
        }

        req.user = user;
        return next();
    })(req, res, next);
};

const jwtAuth = (type: "access" | "refresh") => (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(`jwt-${type}`, { session: false }, (err: PPError, user: PPUser) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        if (!user) {
            return res.status(401).json({ error: "User is unauthorized" });
        }

        req.user = user;
        return next();
    })(req, res, next);
};

export const jwtAccessAuth = jwtAuth("access");
export const jwtRefreshAuth = jwtAuth("refresh");

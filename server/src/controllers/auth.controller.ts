// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Middlewares
import { jwtAccessAuth, jwtRefreshAuth, localAuth } from "../middlewares/passport.middleware";

// Service
import AuthService from "../service/auth.service";
import { verifyShift } from "../middlewares/authorized.middleware";

export default {
    loginPost: [
        localAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = AuthService.generateTokens(user);
            AuthService.sendRefreshCookie(res, refreshToken);
            res.json({ message: "Login successful", accessToken });
        },
    ],

    refreshPost: [
        jwtRefreshAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = AuthService.generateTokens(user);
            AuthService.sendRefreshCookie(res, refreshToken);
            res.json({ message: "Refresh successful", accessToken });
        },
    ],

    logoutPost(req: Request, res: Response) {
        const hasRefresh = Boolean(req.cookies?.refreshToken);
        if (hasRefresh) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });
        }
        res.json({ message: "Logged out successfully" });
    },

    protectedGet: [
        jwtAccessAuth,
        verifyShift,
        (_req: Request, res: Response) => {
            return res.json({ message: "Authentication passed" });
        },
    ],
};

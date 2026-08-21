import type { Request, Response } from "express";
import { jwtAccessAuth, jwtRefreshAuth, localAuth } from "../middlewares/passport.middleware";
import type { User } from "@qcpesopedro/shared/prisma/client";
import AuthService from "../service/auth.service";

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

    logoutPost(_req: Request, res: Response) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.json({ message: "Logged out successfully" });
    },

    protectedGet: [
        jwtAccessAuth,
        (_req: Request, res: Response) => {
            return res.json({ message: "Authentication passed" });
        },
    ],
};

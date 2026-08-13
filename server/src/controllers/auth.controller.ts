import type { Request, Response } from "express";
import env from "../config/env.config";
import jwt from "jsonwebtoken";
import { jwtAccessAuth, jwtRefreshAuth, localAuth } from "../middlewares/passport.middleware";
import type { User } from "@qcpesopedro/shared/prisma/client";
import ms from "ms";

// Helper to generate tokens
const generateTokens = (user: User) => {
    // Server token (Http-only cookie)
    const refreshToken = jwt.sign({ sub: user.id, email: user.email }, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions);

    // Client token (in-memory)
    const accessToken = jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
};

const sendRefreshCookie = (res: Response, refreshToken: string) => {
    // Send refresh token as a secure HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production", // set to true in production with HTTPS
        sameSite: "lax", //balanced security
        maxAge: ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue),
    });
};

export default {
    loginPost: [
        localAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = generateTokens(user);
            sendRefreshCookie(res, refreshToken);
            res.json({ message: "Login successful", accessToken });
        },
    ],

    refreshPost: [
        jwtRefreshAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = generateTokens(user);
            sendRefreshCookie(res, refreshToken);
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

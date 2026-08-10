import type { Request, Response } from "express";
import env from "../config/env";
import jwt from "jsonwebtoken";
import { jwtAccessAuth, jwtRefreshAuth, localAuth } from "../middlewares/passport";
import type { User } from "../../generated/prisma/client";
import ms from "ms";

// Helper to generate tokens
const generateTokens = (user: User) => {
    // Server token (Http-only cookie)
    const refreshToken = jwt.sign({ sub: user.id, email: user.email }, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions);

    // Client token (in-memory)
    const accessToken = jwt.sign({ sub: user.id, email: user.email }, env.JWT_ACCESS_SECRET, {
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
    authLoginPost: [
        localAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = generateTokens(user);
            sendRefreshCookie(res, refreshToken);
            res.json({ message: "Login successful", accessToken });
        },
    ],

    authRefreshPost: [
        jwtRefreshAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = generateTokens(user);
            sendRefreshCookie(res, refreshToken);
            res.json({ message: "Refresh successful", accessToken });
        },
    ],

    authLogoutPost(_req: Request, res: Response) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.json({ message: "Logged out successfully" });
    },

    protectedGet: [
        jwtAccessAuth,
        (req: Request, res: Response) => {
            const user = req.user as User;
            return res.json({ message: "Authentication passed", email: user.email });
        },
    ],
};
